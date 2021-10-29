import * as BrowserFS from 'browserfs';
import { global } from '../runtime/global';

BrowserFS.install(global);
BrowserFS.configure({
  fs: 'Emscripten',
  options: {}
}, () => {
  
})

export function openSync () {
  debugger;
}

export function stat () {
  debugger;
}

export function FSReqCallback () {}


export default {
  openSync,
  stat,
  FSReqCallback
}