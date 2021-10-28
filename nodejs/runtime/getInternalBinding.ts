import * as bindings from '../bindings';

export function getInternalBinding (module) {
  return bindings[module]
}