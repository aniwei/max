export class Module {
  public source: Map<string, string> = new Map()

  lookup (id) {
    let module = this.source.get(id);
    if (module) {
      return module
    }


    const req = new XMLHttpRequest();
    let response;
    
    req.responseType = `text`;
    req.open(`GET`, `/nodejs/lib/${id}`, false)
    req.addEventListener('load', () => {
      const status = req.status;
      if (status === 200 || status === 304) {
        response = req.responseText;
      }
    });

    module = `(function (exports, require, module, process, internalBinding, primordials) { ${response} }) \x0a//#\x20sourceURL=files://${id}`
    this.source.set(id, module);
    return module
  }
}