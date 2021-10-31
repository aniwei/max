export class TaskQueue {
  static id = `task_queue`

  public constants = {
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

  public promiseRejectEvents = {
    kPromiseRejectWithNoHandler: 0,
    kPromiseHandlerAddedAfterReject: 1,
    kPromiseRejectAfterResolved: 2,
    kPromiseResolveAfterResolved: 3
  }

  setTickCallback () {}
  setPromiseRejectCallback () {}
}
