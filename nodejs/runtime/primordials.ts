import { global } from './global'

function rename (src, dest, prefix) {
  for (const key of Reflect.ownKeys(src)) {
    if (typeof key === 'string') {
      const desc = Reflect.getOwnPropertyDescriptor(src, key)

      if (desc) {
        Reflect.defineProperty(dest, `${prefix}${key[0].toUpperCase()}${key.slice(1)}`, desc)
      }
    }
  }
}

function copy (src, dest) {
  for (const key of Reflect.ownKeys(src)) {
    if (!Reflect.getOwnPropertyDescriptor(dest, key)) {
      const desc = Reflect.getOwnPropertyDescriptor(src, key)

      if (desc) {
        Reflect.defineProperty(dest, key, desc)
      }
    }
  }
}

function safe(unsafe, safe) {
  copy(unsafe.prototype, safe.prototype)
  copy(unsafe, safe)

  Object.setPrototypeOf(safe.prototype, null)
  Object.freeze(safe.prototype)
  Object.freeze(safe)

  return safe
}

function uncurryThis(func) {
  return (thisArg, ...args) => Reflect.apply(func, thisArg, args)
}

export const SafeMap = safe(Map, class SafeMap extends Map {})
export const SafeWeakMap = safe(WeakMap, class SafeWeakMap extends WeakMap {})
export const SafeSet = safe(Set, class SafeSet extends Set {})
export const SafeArray = safe(Array, class SafeArray extends Array {})
export const SafePromise = safe(Promise, class SafePromise extends Promise<unknown> {})

export const AggregateError = global.AggregateError    
export const ArrayFrom = uncurryThis(Array.from)
export const ArrayIsArray = uncurryThis(Array.isArray)
export const ArrayPrototypeFilter = uncurryThis(Array.prototype.filter)
export const ArrayPrototypeIncludes = uncurryThis(Array.prototype.includes)
export const ArrayPrototypeIndexOf = uncurryThis(Array.prototype.indexOf)
export const ArrayPrototypeJoin = uncurryThis(Array.prototype.join)
export const ArrayPrototypeMap = uncurryThis(Array.prototype.map)
export const ArrayPrototypePop = uncurryThis(Array.prototype.pop)
export const ArrayPrototypePush = uncurryThis(Array.prototype.push)
export const ArrayPrototypeSlice = uncurryThis(Array.prototype.slice)
export const ArrayPrototypeSplice = uncurryThis(Array.prototype.splice)
export const ArrayPrototypeUnshift = uncurryThis(Array.prototype.unshift)

export const Error = global.Error
export const ErrorCaptureStackTrace = Error.captureStackTrace
export const ErrorPrototypeToString = Error.prototype.toString

export const JSONStringify = JSON.stringify
export const JSONParse = JSON.parse

export const MathAbs = Math.abs
export const MathMin = Math.min
export const MathMax = Math.max
export const MathFloor = Math.floor
export const Number = global.Number
export const NumberIsInteger = uncurryThis(Number.isInteger)


export const ObjectDefineProperty = Object.defineProperty
export const ObjectDefineProperties = Object.defineProperties
export const ObjectIsExtensible = Object.isExtensible
export const ObjectCreate = Object.create
export const ObjectKeys = Object.keys
export const ObjectPrototypeHasOwnProperty = Object.prototype.hasOwnProperty
export const ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
export const ObjectGetOwnPropertyNames = Object.getOwnPropertyNames

export const Proxy = global.Proxy

export const RangeError = global.RangeError
export const ReflectApply = Reflect.apply
export const ReflectGet = Reflect.get
export const RegExpPrototypeTest = uncurryThis(RegExp.prototype.test)
export const SafeArrayIterator = SafeArray.Iterator


export const String = global.String
export const StringPrototypeEndWith = uncurryThis(String.prototype.endsWith)
export const StringPrototypeIncludes = uncurryThis(String.prototype.includes)
export const StringPrototypematch = uncurryThis(String.prototype.match)
export const StringPrototypeStartsWith = uncurryThis(String.prototype.startsWith)
export const StringPrototypeSlice = uncurryThis(String.prototype.slice)
export const StringPrototypeSplite = uncurryThis(String.prototype.splite)
export const StringPrototypeToLowerCase = uncurryThis(String.prototype.toLowerCase)

export const Symbol = global.Symbol
export const SymbolFor = uncurryThis(Symbol.for)
export const SyntaxError = global.SyntaxError

export const TypeError = global.TypeError
export const URIError = global.URIError


export const Float32Array = global.Float32Array
export const Float64Array = global.Float64Array
export const Uint8Array = global.Uint8Array