import { global } from './global';

function rename (src, dest, prefix) {
  for (const key of Reflect.ownKeys(src)) {
    if (typeof key === 'string') {
      const desc = Reflect.getOwnPropertyDescriptor(src, key);

      if (desc) {
        Reflect.defineProperty(dest, `${prefix}${key[0].toUpperCase()}${key.slice(1)}`, desc);
      }
    }
  }
}

function copy (src, dest) {
  for (const key of Reflect.ownKeys(src)) {
    if (!Reflect.getOwnPropertyDescriptor(dest, key)) {
      const desc = Reflect.getOwnPropertyDescriptor(src, key);

      if (desc) {
        Reflect.defineProperty(dest, key, desc);
      }
    }
  }
}

function safe(unsafe, safe) {
  copy(unsafe.prototype, safe.prototype);
  copy(unsafe, safe);

  Object.setPrototypeOf(safe.prototype, null);
  Object.freeze(safe.prototype);
  Object.freeze(safe);

  return safe;
}

function uncurryThis(func) {
  return (thisArg, ...args) => Reflect.apply(func, thisArg, args);
}

export const SafeMap = safe(Map, class SafeMap extends Map {});
export const SafeWeakMap = safe(WeakMap, class SafeWeakMap extends WeakMap {});
export const SafeSet = safe(Set, class SafeSet extends Set {});
export const SafePromise = safe(Promise, class SafePromise extends Promise<unknown> {});

export const ObjectCreate = Object.create;
export const ObjectKeys = Object.keys;
export const ObjectPrototypeHasOwnProperty = Object.prototype.hasOwnProperty;
export const JSONStringify = JSON.stringify;
export const JSONParse = JSON.parse;
export const MathMin = Math.min;
export const MathMax = Math.max;
export const MathFloor = Math.floor;
export const ReflectGet = Reflect.get;
export const ErrorPrototypeToString = Error.prototype.toString;
export const ObjectDefineProperty = Object.defineProperty;

export const ArrayPrototypePush = uncurryThis(Array.prototype.push);
export const ArrayPrototypeMap = uncurryThis(Array.prototype.map);

export const StringPrototypeStartsWith = uncurryThis(String.prototype.startsWith);