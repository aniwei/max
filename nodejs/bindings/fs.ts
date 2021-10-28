import BrowserFS, { EmscriptenFS } from 'browserfs';
import { global } from '../runtime/global';

BrowserFS.initialize(global);
BrowserFS.configure({
  fs: 'LocalStorage',
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