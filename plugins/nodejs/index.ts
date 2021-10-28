import fs from 'fs-extra';


export function NodeJSRuntimePlugin () {
  return {
    name: 'vite-nodejs-runtime-plugin',
    async load (id) {
      if (id.includes('nodejs/lib/internal/bootstrap/loaders')) {
        const source = await fs.readFile(id);
        return `export function main (process, getLinkedBinding, getInternalBinding, primordials) { ${source} } \x0a//#\x20sourceURL=files://${id}`
      }
    }
  }
}