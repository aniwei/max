import { global } from './global'
import { lib } from './nodejs.lib';

class Module {
  public module
  public code
  public id

  constructor (id, code) {
    this.id = id;
    this.code = `(${code})` + `\x0a//#\x20sourceURL=nodejs://${id}`
  }

  compile () {
    if (this.module) {
      return this.module
    }

    this.module = global.evalute(this.code)
    return this.module
  }
}

export class Lib extends Map<string, Module> {
  constructor () {
    super()

    for (const [id, code] of lib) {
      const file = id.replace(/\.js$/g, '')
      this.set(file, new Module(file, code))
    }
  }
  
  get (id) {
    const lib = super.get(id);
    return lib.compile();
  }
}