const fs = require('fs-extra')
const path = require('path');
const esbuild = require('esbuild');
const globby = require('globby');

const isLoader = (file) => file === `internal/bootstrap/loaders.js`;
const isNode = (file) => file === `internal/bootstrap/node.js`;
const isMain = (file) => file === `internal/main/run_main_module.js`

const wrapper = (args, code) => {
  return `function (${args.join(', ')}) { 
  ${code}}`
}

const buildInternalModules = async () => {
  const files = await globby(['*/**/*.js', '*/*.js', '*.js'], {
    cwd: path.resolve(__dirname, 'nodejs/lib')
  });

  const modules = (await Promise.all(files.map(async file => {
    const content = await fs.readFile(path.join(__dirname, 'nodejs/lib', file));
    

    const { code, map } = esbuild.transformSync(content.toString(), { 
      loader: 'js',
      minify: false
    })   

    let wrapped;

    if (isLoader(file)) {
      wrapped = wrapper(['process', 'getLinkedBinding', 'getInternalBinding', 'primordials'], code)
    } else if (isMain(file)) {
      wrapped = wrapper(['process', 'require', 'internalBinding', 'primordials', 'markBootstrapComplete'], code)
    } else if (isNode(file)) {
      wrapped = wrapper(['process', 'require', 'internalBinding', 'primordials', 'markBootstrapComplete'], code)
    } else {
      wrapped = wrapper(['exports', 'require', 'module', 'process', 'internalBinding', 'primordials'], code)
    }

    return [file, wrapped]
  })))

  const string = `export const lib = ${JSON.stringify(modules)}`

  fs.writeFile(path.resolve(__dirname, 'nodejs.lib.ts'), string)
}

buildInternalModules()

