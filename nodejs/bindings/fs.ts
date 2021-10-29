import * as BrowserFS from 'browserfs';
import { global } from '../runtime/global';

BrowserFS.install(global);
BrowserFS.configure({
  fs: 'Emscripten',
  options: {}
}, () => {
  
})

export function internalModuleStat () {
  return 0
}

export function internalModuleReadJSON () {
  return {}
}

export function open () {
  return 10
}

export function read () {
  return Buffer.from(`alert(1)`)
}

export function close () {
  return 10
}

export function lstat () {
  return {}
}


export function fstat () {
  return {}
}

export function FSReqCallback () {}


export default {
  lstat,
  fstat,
  open,
  read,
  close,
  FSReqCallback,
  internalModuleStat,
  internalModuleReadJSON
}