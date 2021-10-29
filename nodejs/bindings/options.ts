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