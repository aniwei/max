const primordials = {};

const globals = this;

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
  static [Symbol.hasInstance](instance) {
    return instance instanceof globals.Error;
  }

  static stackTraceLimit = globals.Error.stackTraceLimit;

  constructor(...args) {
    super(...args);
  }

  static captureStackTrace(targetObject, fn) {
    const stackTraceLimit = Error.stackTraceLimit;

    let cachedStack;

    Object.defineProperty(targetObject, 'stack', {
      get: () => {
        // once we computed the stack, we only return a cached version
        if (cachedStack) {
          return cachedStack;
        }

        const error = { message: targetObject.message, name: targetObject.name, code: targetObject.code };

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

function uncurryThis(func) {
  return (thisArg, ...args) => ReflectApply(func, thisArg, args);
}

function copyPropsRenamedBound(src, dest, prefix) {
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

function copyPrototype(src, dest, prefix) {
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

function copyPropsRenamed(src, dest, prefix) {
  for (const key of Reflect.ownKeys(src)) {
    if (typeof key === 'string') {
      const srcDescriptor = Reflect.getOwnPropertyDescriptor(src, key);

      if (srcDescriptor) {
        Reflect.defineProperty(dest, `${prefix}${key[0].toUpperCase()}${key.slice(1)}`, srcDescriptor);
      }
    }
  }
}
function copyProps(src, dest) {
  for (const key of Reflect.ownKeys(src)) {
    if (!Reflect.getOwnPropertyDescriptor(dest, key)) {
      const srcDescriptor = Reflect.getOwnPropertyDescriptor(src, key);

      if (srcDescriptor) {
        Reflect.defineProperty(dest, key, srcDescriptor);
      }
    }
  }
}
function makeSafe(unsafe, safe) {
  copyProps(unsafe.prototype, safe.prototype);
  copyProps(unsafe, safe);

  Object.setPrototypeOf(safe.prototype, null);
  Object.freeze(safe.prototype);
  Object.freeze(safe);

  return safe;
}

const ReflectApply = Reflect.apply;
primordials.SafeMap = makeSafe(Map, class SafeMap extends Map {});
primordials.SafeWeakMap = makeSafe(WeakMap, class SafeWeakMap extends WeakMap {});
primordials.SafeSet = makeSafe(Set, class SafeSet extends Set {});
primordials.SafePromise = makeSafe(Promise, class SafePromise extends Promise {});

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


const process = {}
function getLinkedBinding(){}
function getInternalBinding() {
  debugger;
  return {}
}



const imports = (module) => {
  const xhr = new XMLHttpRequest();

  xhr.open('get', module, false);
  xhr.responseType = `text`;
  xhr.onload = function(e) { 
    debugger;
    if(this.status == 200||this.status == 304){
      const bootstrap = new Function(
        `process`, 
        `getLinkedBinding`, 
        `getInternalBinding`, 
        `primordials`,
        xhr.responseText + '\x0a//#\x20sourceURL=files://nodejs/lib/internal/bootstrap/loaders.js'
      )

      const returnExport = bootstrap(process,
        getLinkedBinding,
        getInternalBinding,
        primordials
      );
    }
  };

  xhr.send(null);  
}

imports(`/lib/internal/bootstrap/loaders.js`)
