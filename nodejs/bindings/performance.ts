export const milestones = {}


export const constants = {
  NODE_PERFORMANCE_ENTRY_TYPE_GC: 0,
  NODE_PERFORMANCE_ENTRY_TYPE_HTTP2: 1,
  NODE_PERFORMANCE_ENTRY_TYPE_HTTP: 4
}

export function getTimeOrigin () {}
export function setupObservers () {}
export function getTimeOriginTimestamp () {}

export class Histogram {}


export default {
  milestones,
  constants,
  getTimeOrigin,
  setupObservers,
  getTimeOriginTimestamp,
  Histogram
}