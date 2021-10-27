import { parseErrorStack } from '@blitz/utils';
import type { CallSite } from 'callsites';
import { global } from './vars.internal';

// This file subclasses and stores the JS builtins that come from the VM
// so that Node.js's builtin modules do not need to later look these up from
// the global proxy, which can be mutated by users.

// TODO(joyeecheung): we can restrict access to these globals in builtin
// modules through the JS linter, for example: ban access such as `Object`
// (which falls back to a lookup in the global proxy) in favor of
// `primordials.Object` where `primordials` is a lexical variable passed
// by the native module compiler.

type AnyFn = (...args: any) => any;

export const primordials: any = {};

const globals = global;

const ReflectApply = Reflect.apply;

// This function is borrowed from the function with the same name on V8 Extras'
// `utils` object. V8 implements Reflect.apply very efficiently in conjunction
// with the spread syntax, such that no additional special case is needed for
// function calls w/o arguments.
// Refs: https://github.com/v8/v8/blob/d6ead37d265d7215cf9c5f768f279e21bd170212/src/js/prologue.js#L152-L156
function uncurryThis(func: AnyFn) {
  return (thisArg: any, ...args: any[]) => ReflectApply(func, thisArg, args);
}

primordials.uncurryThis = uncurryThis;

function copyProps(src: object, dest: object) {
  for (const key of Reflect.ownKeys(src)) {
    if (!Reflect.getOwnPropertyDescriptor(dest, key)) {
      const srcDescriptor = Reflect.getOwnPropertyDescriptor(src, key);

      if (srcDescriptor) {
        Reflect.defineProperty(dest, key, srcDescriptor);
      }
    }
  }
}

function copyPropsRenamed(src: object, dest: object, prefix: string) {
  for (const key of Reflect.ownKeys(src)) {
    if (typeof key === 'string') {
      const srcDescriptor = Reflect.getOwnPropertyDescriptor(src, key);

      if (srcDescriptor) {
        Reflect.defineProperty(dest, `${prefix}${key[0].toUpperCase()}${key.slice(1)}`, srcDescriptor);
      }
    }
  }
}

function copyPropsRenamedBound(src: object, dest: object, prefix: string) {
  for (const key of Reflect.ownKeys(src)) {
    if (typeof key === 'string') {
      const desc = Reflect.getOwnPropertyDescriptor(src, key);

      if (!desc) {
        return;
      }

      if (typeof desc.value === 'function') {
        desc.value = desc.value.bind(src);
      }

      Reflect.defineProperty(dest, `${prefix}${key[0].toUpperCase()}${key.slice(1)}`, desc);
    }
  }
}

function copyPrototype(src: object, dest: object, prefix: string) {
  for (const key of Reflect.ownKeys(src)) {
    if (typeof key === 'string') {
      const desc = Reflect.getOwnPropertyDescriptor(src, key);

      if (!desc) {
        return;
      }

      if (typeof desc.value === 'function') {
        desc.value = uncurryThis(desc.value);
      }

      Reflect.defineProperty(dest, `${prefix}${key[0].toUpperCase()}${key.slice(1)}`, desc);
    }
  }
}

function makeSafe(unsafe: any, safe: any) {
  copyProps(unsafe.prototype, safe.prototype);
  copyProps(unsafe, safe);

  Object.setPrototypeOf(safe.prototype, null);
  Object.freeze(safe.prototype);
  Object.freeze(safe);

  return safe;
}

primordials.SafeMap = makeSafe(Map, class SafeMap extends Map {});
primordials.SafeWeakMap = makeSafe(WeakMap, class SafeWeakMap extends WeakMap {});
primordials.SafeSet = makeSafe(Set, class SafeSet extends Set {});
primordials.SafePromise = makeSafe(Promise, class SafePromise extends Promise<unknown> {});

primordials.ObjectCreate = Object.create;
primordials.ObjectDefineProperty = Object.defineProperty;
primordials.ObjectKeys = Object.keys;
primordials.ObjectPrototypeHasOwnProperty = Object.prototype.hasOwnProperty;

primordials.JSONStringify = JSON.stringify;
primordials.JSONParse = JSON.parse;

primordials.MathMin = Math.min;
primordials.MathMax = Math.max;
primordials.MathFloor = Math.floor;

primordials.ReflectGet = Reflect.get;

primordials.ErrorPrototypeToString = Error.prototype.toString;

// create copies of intrinsic objects
['JSON', 'Math', 'Reflect'].forEach((name) => {
  copyPropsRenamed(globals[name], primordials, name);
});

/**
 * This class is needed to be able to enhance internal errors, because they heavily
 * rely on `prepareStackTrace`, which is only available in V8. This class provides
 * a wrapper around the global Error object, that is able to return callsites
 * if desired.
 */
class InternalError extends globals.Error {
  /**
   * We need a custom `instanceof` behavior because otherwise userland errors would
   * not satisfy checks against this internal primordials error. For example:
   *
   * ```
   * const userlandError = new Error(); // global userland error
   * console.log(userlandError instanceof InternalError) // => false
   * ```
   *
   * Even though `InternalError` extends from `globals.Error` it would not
   * be an instance of it.
   */
  static [Symbol.hasInstance](instance: any) {
    return instance instanceof globals.Error;
  }

  static stackTraceLimit = globals.Error.stackTraceLimit;

  constructor(...args: any[]) {
    super(...args);
  }

  static captureStackTrace(targetObject: any, fn?: AnyFn) {
    const stackTraceLimit = Error.stackTraceLimit;

    let cachedStack: string | CallSite[] | undefined;

    Object.defineProperty(targetObject, 'stack', {
      get: () => {
        // once we computed the stack, we only return a cached version
        if (cachedStack) {
          return cachedStack;
        }

        const error: {
          name?: string;
          code?: string;
          message?: string;
          stack?: string;
        } = { message: targetObject.message, name: targetObject.name, code: targetObject.code };

        const { overrideStackTrace } = require('@node/internal/errors');

        const originalStackTraceLimit = Error.stackTraceLimit;
        Error.stackTraceLimit = stackTraceLimit;

        const originalPrepareStackTrace = Error.prepareStackTrace;

        if (overrideStackTrace.has(targetObject)) {
          Error.prepareStackTrace = undefined;
        }

        Error.captureStackTrace(error, fn);

        // remember stack before resetting the original `prepareStackTrace`
        cachedStack = error.stack;

        Error.stackTraceLimit = originalStackTraceLimit;
        Error.prepareStackTrace = originalPrepareStackTrace;

        if (overrideStackTrace.has(targetObject)) {
          const callsites = parseErrorStack(cachedStack);

          const prepareStackTrace = overrideStackTrace.get(targetObject);

          cachedStack = prepareStackTrace(targetObject, callsites);

          overrideStackTrace.delete(targetObject);

          return cachedStack;
        }

        return cachedStack;
      },
    });
  }
}

Object.defineProperty(InternalError, 'name', {
  value: 'Error',
});

[
  'Array',
  'ArrayBuffer',
  'BigInt',
  'BigInt64Array',
  'BigUint64Array',
  'Boolean',
  'Date',
  'Error',
  'TypeError',
  'SyntaxError',
  'RangeError',
  'URIError',
  'Float32Array',
  'Float64Array',
  'Function',
  'Int16Array',
  'Int32Array',
  'Int8Array',
  'Map',
  'Number',
  'Object',
  'RegExp',
  'Set',
  'String',
  'Symbol',
  'Uint16Array',
  'Uint32Array',
  'Uint8Array',
  'Uint8ClampedArray',
  'WeakMap',
  'WeakSet',
].forEach((name) => {
  let original = globals[name];

  if (name === 'Error') {
    original = InternalError;
  }

  primordials[name] = original;
  copyPropsRenamed(original, primordials, name);
  copyPrototype(original.prototype, primordials, `${name}Prototype`);
});

['Promise'].forEach((name) => {
  const original = globals[name];
  primordials[name] = original;
  copyPropsRenamedBound(original, primordials, name);
  copyPrototype(original.prototype, primordials, `${name}Prototype`);
});

Object.setPrototypeOf(primordials, null);
Object.freeze(primordials);
