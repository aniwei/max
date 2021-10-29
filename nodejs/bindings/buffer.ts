import * as Buffer from '../runtime/buffer'

export function getZeroFillToggle () {
  return []
}

export function encodeUtf8String () {}

export function setBufferPrototype () {}

export function byteLengthUtf8 (string, encoding) {
  return Buffer.byteLength(string, encoding)
}

export default {
  ...Buffer,
  byteLengthUtf8,
  getZeroFillToggle,
  setBufferPrototype,
  encodeUtf8String
}