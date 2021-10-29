import fs from 'fs-extra';


export function NodeJSRuntimePlugin () {
  return {
    name: 'vite-nodejs-runtime-plugin',

    async transform (code, id) {
      return {
        code,
        map: {}
      }
    },

    async load (id) {
      if (id.includes('nodejs/lib/internal/bootstrap/loaders')) {
        const source = await fs.readFile(id);
        return `export function internal (process, getLinkedBinding, getInternalBinding, primordials) { ${source} } \x0a//#\x20sourceURL=files://${id}`
      } else if (id.includes('nodejs/lib/internal/main/run_main_module')) {
        const source = await fs.readFile(id);
        return `export function execute (process, require, internalBinding, primordials, markBootstrapComplete) { ${source} } \x0a//#\x20sourceURL=files://${id}`
      } else if (id.includes('nodejs/lib')) {
        const source = await fs.readFile(id);
        return `(function (exports, require, module, process, internalBinding, primordials) { ${source} }) \x0a//#\x20sourceURL=files://${id}`
      }
    }
  }
}