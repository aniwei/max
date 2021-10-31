import { global } from '../global'

class ContextifyScript {
    
}

class MicrotaskQueue {}

export class Contextify {
  static id = `contextify`

  public context
  public constants = {
    measureMemory: {
      mode: {},
      execution: {}
    }
  }
  public ContextifyScript = ContextifyScript
  public MicrotaskQueue = MicrotaskQueue

  constructor (context) {
    this.context = context;
  }

  compileFunction (
    code, 
    filename, 
    line, 
    column, 
    cache, 
    produce, 
    context, 
    contextExtensions, 
    params
  ) {
    return {
      cacheKey: {},
      function: global.evalute(`(function (${params}){ \n${code }\n })` + `\x0a//#\x20sourceURL=nodejs://${filename}`),
    }
  }
}

