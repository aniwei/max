const aliases = new Map();

aliases.set('-v', ['--version'])
aliases.set('-h', ['--help'])
aliases.set('-p', ['--print'])
aliases.set('-e', ['--eval'])
aliases.set('-r', ['--require'])
aliases.set('-i', ['--interactive'])
aliases.set('-i', ['--interactive'])
aliases.set('--es-module-specifier-resolution', ['--es-module-specifier-resolution'])
aliases.set('--loader', ['--experimental-loader'])

const options = new Map();

options.set('--version', { 
  value: false, 
  type: 2, 
  params: 0, 
  helpText: 'print Node.js version'   
})

options.set('--help', { 
  value: false, type: 2, 
  params: 0, 
  helpText: 'print node command line options'   
})

options.set('--print', { 
  value: false, 
  type: 5, params: 1, 
  helpText: 'evaluate script and print result'   
})

options.set('--eval', { 
  value: undefined, 
  type: 5, 
  params: 1, 
  helpText: 'evaluate script'   
})

options.set('--require', { 
  array: true,
  value: [], 
  type: 5, 
  params: 1, 
  helpText: 'module to preload (option can be repeated)'}) 

options.set('--input-type', { 
  value: [], 
  type: 5, 
  params: 1, 
  helpText: 'set module type for string input'   
})

options.set('--pending-deprecation', { 
  value: false, 
  type: 2, 
  params: 0, 
  helpText: 'emit pending deprecation warnings'   
})

options.set('--interactive', { 
  value: false, 
  type: 2, 
  params: 0, 
  helpText: 'always enter the REPL even if stdin does not appear to be a terminal'   
})

options.set('--inspect-brk', { 
  value: false, 
  type: 2, 
  params: 0, 
  helpText: 'activate inspector'   
})

options.set('--no-warnings', { 
  value: false, 
  type: 2, 
  params: 0, 
  helpText: 'silence all process warnings'   
})

options.set('--conditions', { 
  value: [], 
  type: 7, 
  params: 0, 
  helpText: 'additional user conditions for conditional exports and imports'   
})

options.set('--experimental-specifier-resolution', { 
  value: [], 
  type: 5, 
  params: 1, 
  helpText: 'Select extension resolution algorithm for es modules; either \'explicit\' (default)or \'node\''   
}) 

options.set('--experimental-json-modules', { 
  value: false, 
  type: 2, 
  params: 0, 
  helpText: 'experimental JSON interop support for the ES Module loader'   
})

options.set('--experimental-import-meta-resolve', { 
  value: false, 
  type: 2, 
  params: 0, 
  helpText: 'experimental ES Module import.meta.resolve()support'   
})

options.set('--experimental-wasm-modules', { 
  value: false, 
  type: 2, 
  params: 0, 
  helpText: 'experimental ES Module support for webassembly modules'   
})

options.set('--experimental-loader', { 
  value: [], 
  type: 5, 
  params: 1, 
  helpText: 'use the specified module as a custom loader'   
})

options.set('--expose-internals', { 
  value: false, 
  type: 2, 
  params: 0, 
  helpText: 'undefined'   
})

options.set('--preserve-symlinks', { 
  value: false, 
  type: 2, 
  params: 0, 
  helpText: 'preserve symbolic links when resolving'   
})

options.set('--preserve-symlinks-main', { 
  value: false, 
  type: 2, 
  params: 0, 
  helpText: 'preserve symbolic links when resolving'   
})

options.set('--tls-cipher-list', { 
  value: 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA', 
  type: 7, 
  params: 0, 
  helpText: 'use an alternative default TLS cipher list'   
})


export const envSettings = {
  kAllowedInEnvironment: 0,
  kDisallowedInEnvironment: 1
}

export function getOptions () {
  return {
    aliases,
    options
  }
}

export const types = {
  kBoolean: 2,
  kHostPort: 6,
  kInteger: 3,
  kNoOp: 0,
  kString: 5,
  kStringList: 7,
  kUInteger: 4,
  kV8Option: 1
}

export default {
  envSettings,
  getOptions,
  aliases,
  options,
  types,
}