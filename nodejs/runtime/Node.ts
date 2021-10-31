import { global } from './global';
import { Bindings } from './Bindings'
import { Lib } from './Lib'
import { Files } from './Files';
import { Process } from './Process';
import { primordials } from './primordials';


export class NodeJS {
  public env
  public lib
  public files
  public process
  public bindings
  public require
  public internalBinding;
  public NativeModule;
  public primordials = primordials

  constructor () {
    this.lib = new Lib();
    this.files = new Files()
    this.process = new Process();
    this.bindings = new Bindings(this);
    
    global.addEventListener(`message`, this.onMessage);
  }

  postMessage (message) {
    global.postMessage(message)
  }

  onMessage = () => {

  }

  getInternalBinding = (module) => {
    return this.bindings.get(module)
  }

  getLinkedBinding = () => {
    
  }

  init () {
    const lib = this.lib.get(`internal/bootstrap/loaders`)

    const {
      NativeModule,
      internalBinding,
      require
    } = lib(
      this.process,
      this.getLinkedBinding,
      this.getInternalBinding,
      this.primordials
    );

    this.require = require;
    this.NativeModule = NativeModule;
    this.internalBinding = internalBinding;

    return this;
  }

  boot () {
    const lib = this.lib.get(`internal/bootstrap/node`)

    lib(
      this.process, 
      this.require, 
      this.internalBinding, 
      this.primordials, 
      () => {
        this.postMessage({})
      }
    )

    return this;
  }

  run (mainjs) {
    this.process.argv = [`/usr/local/bin/node`, mainjs]

    const lib = this.lib.get(`internal/main/run_main_module`)
    lib(
      this.process,
      this.require,
      this.internalBinding,
      this.primordials,
      function markBootstrapComplete () {
        // debugger;
      }
    )
  }
}
