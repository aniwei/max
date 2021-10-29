import { getInternalBinding } from './getInternalBinding';
import { getLinkedBinding } from './getLinkedBinding';
import { global } from './global';
import { process } from './process';
import { primordials } from './primordials';
// @ts-ignore
import { internal } from '../lib/internal/bootstrap/loaders';
// @ts-ignore
import { execute } from '../lib/internal/main/run_main_module';


class Environment {
  public global = global;
  public process = process;
  public getLinkedBinding = getLinkedBinding;
  public getInternalBinding = getInternalBinding
  public primordials = primordials;
  public NativeModule;
  public internalBinding;
  public require

  boot () {
    const {
      NativeModule,
      internalBinding,
      require
    } = internal(
      this.process,
      this.getLinkedBinding,
      this.getInternalBinding,
      this.primordials
    );

    this.require = require;
    this.NativeModule = NativeModule;
    this.internalBinding = internalBinding;
  }

  run () {
    this.boot();
    this.execute();
  }

  execute () {
    execute(
      this.process,
      this.require,
      this.internalBinding,
      this.primordials,
      function markBootstrapComplete () {
        debugger;
      }
    )
  }
}

export const environment = new Environment()