import { AsyncWrap } from './bindings/AsyncWrap';
import { Blob } from './bindings/Blob';
import { Buffer } from './bindings/Buffer';
import { Config } from './bindings/Config';
import { Constants } from './bindings/Constants';
import { Contextify } from './bindings/Contextify';
import { Credentials } from './bindings/Credentials';
import { Errors } from './bindings/Errors';
import { FS } from './bindings/FS';
import { FSDir } from './bindings/FSDir';
import { FSEventWrap } from './bindings/FSEventWrap';
import { HeapUtils } from './bindings/HeapUtils';
import { ICU } from './bindings/ICU';
import { Inspector } from './bindings/Inspector';
import { Messaging } from './bindings/Messaging';
import { ModuleWrap } from './bindings/ModuleWrap';
import { NativeModule } from './bindings/NativeModule';
import { Options } from './bindings/Options';
import { Performance } from './bindings/Performance';
import { ProcessMethods } from './bindings/ProcessMethods';
import { Profiler } from './bindings/Profiler';
import { Report } from './bindings/Report';
import { Serdes } from './bindings/Serdes';
import { StreamWrap } from './bindings/StreamWrap';
import { StringDecoder } from './bindings/StringDecoder';
import { Symbols } from './bindings/Symbols';
import { TaskQueue } from './bindings/TaskQueue';
import { TcpWrap } from './bindings/TcpWrap';
import { Timers } from './bindings/Timers';
import { TraceEvents } from './bindings/TraceEvents';
import { Types } from './bindings/Types';
import { URL } from './bindings/URL';
import { UV } from './bindings/UV';
import { Util } from './bindings/Util';
import { V8 } from './bindings/V8';
import { Worker } from './bindings/Worker';



export class Bindings extends Map {
  public context

  constructor (context) {
    super();
    this.context = context

    this
      .registe(AsyncWrap)
      .registe(Blob)
      .registe(Buffer)
      .registe(Config)
      .registe(Constants)
      .registe(Contextify)
      .registe(Credentials)
      .registe(Errors)
      .registe(FS)
      .registe(FSDir)
      .registe(FSEventWrap)
      .registe(HeapUtils)
      .registe(ICU)
      .registe(Inspector)
      .registe(Messaging)
      .registe(ModuleWrap)
      .registe(NativeModule)
      .registe(Options)
      .registe(Performance)
      .registe(ProcessMethods)
      .registe(Profiler)
      .registe(Report)
      .registe(Serdes)
      .registe(StreamWrap)
      .registe(StringDecoder)
      .registe(Symbols)
      .registe(TaskQueue)
      .registe(TcpWrap)
      .registe(Timers)
      .registe(TraceEvents)
      .registe(Types)
      .registe(URL)
      .registe(UV)
      .registe(Util)
      .registe(V8)
      .registe(Worker)
  }

  registe (Module) {
    this.set(Module.id, {
      id: Module.id,
      exports: null,
      Module
    })

    return this;
  }

  get (id) {
    const module = super.get(id);
    const { exports, Module } = module;

    if (exports) {
      return exports
    }

    module.exports = new Module(this.context)

    return module.exports;
  }
}