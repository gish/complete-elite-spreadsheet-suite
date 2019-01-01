import * as types from './types';

export const createCycle = cycle => ({
  type: types.CREATE_CYCLE,
  payload: cycle,
});

export const deleteCycle = cycleId => ({
  type: types.DELETE_CYCLE,
  payload: cycleId,
});

export const toggleSetCompleted = (
  cycleId,
  weekId,
  dayId,
  setId,
  completed,
) => ({
  type: types.TOGGLE_SET_COMPLETED,
  payload: {cycleId, weekId, dayId, setId, completed},
});
