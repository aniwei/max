interface IOption {
  value: any,
  type: number,
  params?: number,
  alias?: string,
  helpText: string
}

class Option extends Array implements IOption {
  constructor (options: any[]) {
    super()

    for (const option of options) {
      this[this.length] = option;
    }
  }

  public get value  () {
    return this[0]
  }

  public get type  () {
    return this[1]
  }

  public get helpText () {
    return this[2]
  }

  public get params  () {
    return this[3]
  }

  public get alias () {
    return this[4]
  }
}

class Aliases extends Map<string, string[]> {
  alias (key, value) {
    super.set(key, value)
  }
}

export class Options extends Map<string, Option> {
  static id = `options`

  public aliases = new Aliases()
  public options = this;

  public envSettings = {
    kAllowedInEnvironment: 0,
    kDisallowedInEnvironment: 1
  }

  public types = {
    kBoolean: 2,
    kHostPort: 6,
    kInteger: 3,
    kNoOp: 0,
    kString: 5,
    kStringList: 7,
    kUInteger: 4,
    kV8Option: 1
  }

  constructor (context) {
    super();
    const { version } = context;

    this
      .option(`--version`, new Option([version, 2, 0, `print Node.js version`, `-v`]))
      .option(`--help`, new Option([null, 2, 0, `print node command line options`, `-h`]))
      .option(`--print`, new Option([null, 5, 1, `evaluate script and print result`, `p`]))
      .option(`--eval`, new Option([null, 5, 1, `evaluate script`, `-e`]))
      .option(`--require`, new Option([true, 5, 1, `module to preload (option can be repeated)`, `-r`]))
      .option(`--input-type`, new Option([[], 5, 1, `set module type for string input`]))
      .option(`--pending-deprecation`, new Option([null, 2, 0, `emit pending deprecation warnings`]))
      .option(`--interactive`, new Option([null, 2, 0, `always enter the REPL even if stdin does not appear to be a terminal`, `-i`]))
      .option(`--interactive`, new Option([null, 2, 0, `activate inspector`]))
      .option(`--no-warnings`, new Option([null, 2, 0, `silence all process warnings`]))
      .option(`--conditions`, new Option([[], 7, 0, `additional user conditions for conditional exports and imports`]))
      .option(`--enable-source-maps`, new Option([false, 5, 1, `enable source map`]))
      .option(`--experimental-specifier-resolution`, new Option([[], 5, 1, `Select extension resolution algorithm for es modules; either \'explicit\' (default)or \'node\'`]))
      .option(`--experimental-json-modules`, new Option([null, 2, 0, `experimental JSON interop support for the ES Module loader`]))
      .option(`--experimental-import-meta-resolve`, new Option([null, 2, 0, `experimental ES Module import.meta.resolve()support`]))
      .option(`--experimental-wasm-modules`, new Option([null, 2, 0, `experimental ES Module support for webassembly modules`]))
      .option(`--experimental-loader`, new Option([null, 5, 1, `use the specified module as a custom loader`]))
      .option(`--expose-internals`, new Option([null, 2, 0, ``]))
      .option(`--preserve-symlinks`, new Option([null, 2, 0, `preserve symbolic links when resolving`]))
      .option(`--preserve-symlinks-main`, new Option([null, 2, 0, `preserve symbolic links when resolving`]))
      .option(`--tls-cipher-list`, new Option([`TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA`, 7, 0, `use an alternative default TLS cipher list`]))
  }

  alias (key, option) {
    if (option.alias) {
      this.aliases.alias(option.alias, [key])
    }
    return this;
  }

  option (key, option) {
    this.alias(key, option);
    super.set(key, option);
    return this;
  }

  getOptions = () => {
    return this
  }
}