import * as BrowserFS from 'browserfs';
import { global } from '../runtime/global';

BrowserFS.install(global);
BrowserFS.configure({
  fs: 'Emscripten',
  options: {}
}, () => {
  debugger;
})

export function openSync () {
  debugger;
}

export function stat () {
  debugger;
}

export function FSReqCallback () {}