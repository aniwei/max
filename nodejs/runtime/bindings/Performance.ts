class Histogram {}

export class Performance {
  static id = `performance`

  public milestones = {}
  public constants = {
    NODE_PERFORMANCE_ENTRY_TYPE_GC: 0,
    NODE_PERFORMANCE_ENTRY_TYPE_HTTP2: 1,
    NODE_PERFORMANCE_ENTRY_TYPE_HTTP: 4
  }

  public Histogram = Histogram
    
  getTimeOrigin () {}
  setupObservers () {}
  getTimeOriginTimestamp () {}
}

