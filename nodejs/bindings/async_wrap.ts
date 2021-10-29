export const constants = {
  kAfter: 2,
  kAsyncIdCounter: 2,
  kBefore: 1,
  kCheck: 6,
  kDefaultTriggerAsyncId: 3,
  kDestroy: 3,
  kExecutionAsyncId: 0,
  kInit: 0,
  kPromiseResolve: 4,
  kStackLength: 7,
  kTotals: 5,
  kTriggerAsyncId: 1,
  kUsesExecutionAsyncResource: 8
}


export const async_id_fields = {}
export const async_hook_fields = {}

export function setupHooks () {}
export function setCallbackTrampoline () {}


export default {
  constants,
  async_id_fields,
  async_hook_fields,
  setupHooks,
  setCallbackTrampoline
}