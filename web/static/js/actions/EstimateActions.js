export function updateOptimistic (estimate) {
  return {
    type: 'UPDATE_ESTIMATE',
    estimate_level: 'optimistic',
    estimate: estimate
  }
}

export function updateRealistic (estimate) {
  return {
    type: 'UPDATE_ESTIMATE',
    estimate_level: 'realistic',
    estimate: estimate
  }
}

export function updatePessimistic (estimate) {
  return {
    type: 'UPDATE_ESTIMATE',
    estimate_level: 'pessimistic',
    estimate: estimate
  }
}
