
import { Buffer } from 'buffer';
import { global } from '../runtime/global'


function writeBufferBase (buffer, utf, offset, length) {
  const subarray = utf.subarray(0, length);
  buffer.set(subarray, offset)
  return subarray.length;
}

export function getZeroFillToggle () {
  return []
}


export function byteLengthUtf8 (string, encoding) {
  return Buffer.byteLength(string, encoding)
}

export function asciiWrite () {}
export function base64Write () {}
export function base64urlWrite () {}
export function latin1Write () {}
export function hexWrite () {}
export function ucs2Write () {}

export function utf8Write (string, offset, length) {
  const encoder = new global.TextEncoder();
  return writeBufferBase(this, encoder.encode(string), offset, length)
}

export default {
  asciiWrite,
  base64Write,
  base64urlWrite,
  latin1Write,
  hexWrite,
  ucs2Write,
  utf8Write,
  byteLengthUtf8,
  getZeroFillToggle
}