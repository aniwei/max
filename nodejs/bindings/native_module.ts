import { environment } from '../runtime/environment'

export const config = '{}';
export const moduleIds = [
  '_http_agent',
  '_http_client',
  '_http_common',
  '_http_incoming',
  '_http_outgoing',
  '_http_server',
  '_stream_duplex',
  '_stream_passthrough',
  '_stream_readable',
  '_stream_transform',
  '_stream_wrap',
  '_stream_writable',
  '_tls_common',
  '_tls_wrap',
  'assert',
  'async_hooks',
  'buffer',
  'child_process',
  'cluster',
  'console',
  'constants',
  'crypto',
  'dgram',
  'dns',
  'domain',
  'events',
  'fs',
  'fs/promises',
  'http',
  'http2',
  'https',
  'inspector',
  'internal/assert',
  'internal/assert/assertion_error',
  'internal/assert/calltracker',
  'internal/async_hooks',
  'internal/bootstrap/environment',
  'internal/bootstrap/loaders',
  'internal/bootstrap/node',
  'internal/bootstrap/pre_execution',
  'internal/bootstrap/switches/does_not_own_process_state',
  'internal/bootstrap/switches/does_own_process_state',
  'internal/bootstrap/switches/is_main_thread',
  'internal/bootstrap/switches/is_not_main_thread',
  'internal/buffer',
  'internal/child_process',
  'internal/child_process/serialization',
  'internal/cli_table',
  'internal/cluster/child',
  'internal/cluster/master',
  'internal/cluster/round_robin_handle',
  'internal/cluster/shared_handle',
  'internal/cluster/utils',
  'internal/cluster/worker',
  'internal/console/constructor',
  'internal/console/global',
  'internal/constants',
  'internal/crypto/certificate',
  'internal/crypto/cipher',
  'internal/crypto/diffiehellman',
  'internal/crypto/hash',
  'internal/crypto/keygen',
  'internal/crypto/keys',
  'internal/crypto/pbkdf2',
  'internal/crypto/random',
  'internal/crypto/scrypt',
  'internal/crypto/sig',
  'internal/crypto/util',
  'internal/deps/acorn-plugins/acorn-class-fields',
  'internal/deps/acorn-plugins/acorn-class-fields/index',
  'internal/deps/acorn-plugins/acorn-private-class-elements',
  'internal/deps/acorn-plugins/acorn-private-class-elements/index',
  'internal/deps/acorn-plugins/acorn-private-methods',
  'internal/deps/acorn-plugins/acorn-private-methods/index',
  'internal/deps/acorn-plugins/acorn-static-class-features',
  'internal/deps/acorn-plugins/acorn-static-class-features/index',
  'internal/deps/acorn/acorn-walk/dist/walk',
  'internal/deps/acorn/acorn/dist/acorn',
  'internal/deps/cjs-module-lexer/dist/lexer',
  'internal/deps/cjs-module-lexer/lexer',
  'internal/deps/node-inspect/lib/_inspect',
  'internal/deps/node-inspect/lib/internal/inspect_client',
  'internal/deps/node-inspect/lib/internal/inspect_repl',
  'internal/deps/v8/tools/SourceMap',
  'internal/deps/v8/tools/arguments',
  'internal/deps/v8/tools/codemap',
  'internal/deps/v8/tools/consarray',
  'internal/deps/v8/tools/csvparser',
  'internal/deps/v8/tools/logreader',
  'internal/deps/v8/tools/profile',
  'internal/deps/v8/tools/profile_view',
  'internal/deps/v8/tools/splaytree',
  'internal/deps/v8/tools/tickprocessor',
  'internal/deps/v8/tools/tickprocessor-driver',
  'internal/dgram',
  'internal/dns/promises',
  'internal/dns/utils',
  'internal/dtrace',
  'internal/encoding',
  'internal/error_serdes',
  'internal/errors',
  'internal/event_target',
  'internal/fixed_queue',
  'internal/freelist',
  'internal/freeze_intrinsics',
  'internal/fs/dir',
  'internal/fs/promises',
  'internal/fs/read_file_context',
  'internal/fs/rimraf',
  'internal/fs/streams',
  'internal/fs/sync_write_stream',
  'internal/fs/utils',
  'internal/fs/watchers',
  'internal/heap_utils',
  'internal/histogram',
  'internal/http',
  'internal/http2/compat',
  'internal/http2/core',
  'internal/http2/util',
  'internal/idna',
  'internal/inspector_async_hook',
  'internal/js_stream_socket',
  'internal/linkedlist',
  'internal/main/check_syntax',
  'internal/main/eval_stdin',
  'internal/main/eval_string',
  'internal/main/inspect',
  'internal/main/print_help',
  'internal/main/prof_process',
  'internal/main/repl',
  'internal/main/run_main_module',
  'internal/main/run_third_party_main',
  'internal/main/worker_thread',
  'internal/modules/cjs/helpers',
  'internal/modules/cjs/loader',
  'internal/modules/esm/create_dynamic_module',
  'internal/modules/esm/get_format',
  'internal/modules/esm/get_source',
  'internal/modules/esm/loader',
  'internal/modules/esm/module_job',
  'internal/modules/esm/module_map',
  'internal/modules/esm/resolve',
  'internal/modules/esm/transform_source',
  'internal/modules/esm/translators',
  'internal/modules/package_json_reader',
  'internal/modules/run_main',
  'internal/net',
  'internal/options',
  'internal/per_context/domexception',
  'internal/per_context/messageport',
  'internal/per_context/primordials',
  'internal/policy/manifest',
  'internal/policy/sri',
  'internal/priority_queue',
  'internal/process/esm_loader',
  'internal/process/execution',
  'internal/process/per_thread',
  'internal/process/policy',
  'internal/process/promises',
  'internal/process/report',
  'internal/process/signal',
  'internal/process/task_queues',
  'internal/process/warning',
  'internal/process/worker_thread_only',
  'internal/querystring',
  'internal/readline/utils',
  'internal/repl',
  'internal/repl/await',
  'internal/repl/history',
  'internal/repl/utils',
  'internal/socket_list',
  'internal/source_map/prepare_stack_trace',
  'internal/source_map/source_map',
  'internal/source_map/source_map_cache',
  'internal/stream_base_commons',
  'internal/streams/buffer_list',
  'internal/streams/destroy',
  'internal/streams/duplex',
  'internal/streams/duplexpair',
  'internal/streams/end-of-stream',
  'internal/streams/from',
  'internal/streams/lazy_transform',
  'internal/streams/legacy',
  'internal/streams/passthrough',
  'internal/streams/pipeline',
  'internal/streams/readable',
  'internal/streams/state',
  'internal/streams/transform',
  'internal/streams/writable',
  'internal/test/binding',
  'internal/timers',
  'internal/tls',
  'internal/trace_events_async_hooks',
  'internal/tty',
  'internal/url',
  'internal/util',
  'internal/util/comparisons',
  'internal/util/debuglog',
  'internal/util/inspect',
  'internal/util/inspector',
  'internal/util/types',
  'internal/v8_prof_polyfill',
  'internal/v8_prof_processor',
  'internal/validators',
  'internal/vm/module',
  'internal/watchdog',
  'internal/worker',
  'internal/worker/io',
  'internal/worker/js_transferable',
  'module',
  'net',
  'os',
  'path',
  'perf_hooks',
  'process',
  'punycode',
  'querystring',
  'readline',
  'repl',
  'stream',
  'string_decoder',
  'sys',
  'timers',
  'tls',
  'trace_events',
  'tty',
  'url',
  'util',
  'v8',
  'vm',
  'wasi',
  'worker_threads',
  'zlib'
];

export class NativeModule {
  static native = new NativeModule()

  public source: Map<string, any> = new Map()

  compile () {

  }

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
    req.send(null);

    module = environment.global.evalute(response);

    this.source.set(id, module);
    return module
  }
}

export function compileFunction (id) {
  
  return NativeModule.native.lookup(id);
}