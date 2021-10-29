import { getInternalBinding } from './getInternalBinding';
import { getLinkedBinding } from './getLinkedBinding';
import { global } from './global';
import { process } from './process';
import { primordials } from './primordials';
// @ts-ignore
import { boot } from '../lib/internal/bootstrap/loaders';
// @ts-ignore
import { init } from '../lib/internal/bootstrap/node';
// @ts-ignore
import { execute } from '../lib/internal/main/run_main_module';

import * as Buffer from './buffer'

class Environment {
  public global = global;
  public process = process;
  public getLinkedBinding = getLinkedBinding;
  public getInternalBinding = getInternalBinding
  public primordials = primordials;
  public NativeModule;
  public internalBinding;
  public require

  public bindings = {
    Buffer,
    TextDecoder: global.TextDecoder
  }

  boot () {
    const {
      NativeModule,
      internalBinding,
      require
    } = boot(
      this.process,
      this.getLinkedBinding,
      this.getInternalBinding,
      this.primordials
    );

    this.require = require;
    this.NativeModule = NativeModule;
    this.internalBinding = internalBinding;

    init(
      this.process,
      this.require,
      this.internalBinding,
      this.primordials,
      function markBootstrapComplete () {
        // debugger;
      }
    )

    execute(
      this.process,
      this.require,
      this.internalBinding,
      this.primordials,
      function markBootstrapComplete () {
        // debugger;
      }
    )
  }

  run () {
    this.boot();
  }
}

export const environment = new Environment()