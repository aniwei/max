export function patchProcessObject () {}

export function getFastAPIs () {
  return {
    hrtime: {}
  }
}

export default {
  getFastAPIs,
  patchProcessObject,
}