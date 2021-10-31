import * as BrowserFS from 'browserfs'
import { WasmFs } from '@wasmer/wasmfs';
import { global } from './global'
import { files } from './test.files';

export class Files {
  public fs;

  constructor () {
    const wasm = new WasmFs();
    
    this.fs = wasm.fs;

    for (const [id, code] of files) {
      wasm.fs.writeFileSync(id, code);
    }
  }

  open (path, flag, mode) {
    return this.fs.openSync(path, flag, mode)
  }

  stat (filename) {
    try {
      const stat = this.fs.statSync(filename)

      if (stat.isFile()) {
        return 0;
      } else if (stat.isDirectory()) {
        return 1;
      }
    } catch (error) {
      return  -2
    }
  }

  lstat (fd) {
    return this.fs.lstatSync(fd)
  }

  fstat (fd) {
    return this.fs.fstatSync(fd)
  }

  read (fd, buffer, offset, length, position) {
    return this.fs.readSync(fd, buffer, offset, length, position)
  }

  close (fd) {
    return this.fs.closeSync(fd)
  }
}



