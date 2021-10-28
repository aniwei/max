import EventEmitter from 'events';

interface ExitOptions {}

interface Channel extends EventEmitter {
  ref (): void;
  unref (): void;
}

interface ProcessVersions extends NodeJS.ProcessVersions {
  brotli: string;
  nghttp2: string;
  napi: string;
  llhttp: string;
  cldr: string;
  icu: string;
  tz: string;
  unicode: string;
}

export interface IProcess {
  version: string;
  execPath: string;
  arch: string;
  platform: NodeJS.Platform;
  env: NodeJS.ProcessEnv;
  release: NodeJS.ProcessRelease;
  versions: ProcessVersions;

  exitCode?: number;

  stdin: NodeJS.Process['stdin'];
  stdout: NodeJS.Process['stdout'];
  stderr: NodeJS.Process['stderr'];

  /** set by the bootstrapper */
  pid: number;
  ppid?: number;
  argv?: string[];
  execArgv?: string[];
  channel?: Channel;

  /* set by internal/node/bootstrap */
  argv0: string;
  hrtime: NodeJS.Process['hrtime'];
  cwd: NodeJS.Process['cwd'];
  chdir: NodeJS.Process['chdir'];
  emit: NodeJS.Process['emit'];
  nextTick: NodeJS.Process['nextTick'];
  _eval?: string;
  _tickCallback: (...args: any[]) => any;
  _fatalException: (error?: Error, fromPromise?: boolean) => any;
  exit: (code: number) => never;
  reallyExit: (code: number | null, options?: ExitOptions) => never;
}

class Process {
  public version: string = 'v14.16.0'
  public execPath = '/usr/local/bin/node'
  public platform = 'linux'
  public arch = 'x64'
  public env = {}

  public release = {
    name: 'node',
    lts: 'Fermium',
    sourceUrl: 'https://nodejs.org/download/release/v14.16.0/node-v14.16.0.tar.gz',
    headersUrl: 'https://nodejs.org/download/release/v14.16.0/node-v14.16.0-headers.tar.gz',
  }

  public versions = {
    node: '14.16.0',
    v8: '8.4.371.19-node.18',
    uv: '1.40.0',
    zlib: '1.2.11',
    brotli: '1.0.9',
    ares: '1.16.1',
    modules: '83',
    nghttp2: '1.41.0',
    napi: '7',
    llhttp: '2.1.3',
    http_parser: '' /** no longer exists and was ported to llhttp */,
    openssl: '1.1.1j',
    cldr: '37.0',
    icu: '67.1',
    tz: '2020a',
    unicode: '13.0',
    max: '1.0.0',
  };
}

export const process: IProcess = new Process() as any;