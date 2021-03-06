import * as types from './types';

export const createCycle = cycle => ({
  type: types.CREATE_CYCLE,
  payload: cycle,
});

export const deleteCycle = cycleId => ({
  type: types.DELETE_CYCLE,
  payload: cycleId,
});

export const performSet = (cycleId, weekId, dayId, setId, timestamp) => ({
  type: types.PERFORM_SET,
  payload: {cycleId, weekId, dayId, setId, timestamp},
});

export const skipSet = (cycleId, weekId, dayId, setId, timestamp) => ({
  type: types.SKIP_SET,
  payload: {cycleId, weekId, dayId, setId, timestamp},
});
