import { setupInspector } from '../inspector';
import { primordials } from './primordials.internal';
import { process } from './process.internal';
import * as vars from './vars.internal';

vars.setProcess(process);

vars.setPrimordials(primordials);

vars.global.global = vars.global;

const { internalBinding } = require('@node/internal/bootstrap/loaders');
vars.setInternalBinding(internalBinding);

const { inspect } = require('@node/internal/util/inspect');
setupInspector(inspect);

export { internalBinding, process, primordials };
