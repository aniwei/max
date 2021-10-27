import { process } from './process';
import { NodeJSModule } from './NodeJSModule';
import { getInternalBinding } from './getInternalBinding';
import { getLinkedBinding } from './getLinkedBinding';
import { primordials } from './primordials'


function main () {
  const module = new NodeJSModule();
  const mainjs = `/nodejs/lib/internal/bootstrap/loaders.js`;
  const response = module.import(mainjs);

  const run = new Function(
    'process',
    'getLinkedBinding', 
    'getInternalBinding', 
    'primordials',
    response + `\x0a//#\x20sourceURL=files://${mainjs}`
  );

  const returnExport = run(
    process,
    getLinkedBinding,
    getInternalBinding,
    primordials
  )

  debugger;
}

main();