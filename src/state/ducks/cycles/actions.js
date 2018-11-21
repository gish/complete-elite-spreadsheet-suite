import * as types from './types';

export const createCycle = cycle => ({
  type: types.CREATE_CYCLE,
  payload: cycle,
});

export const deleteCycle = cycleId => ({
  type: types.DELETE_CYCLE,
  payload: cycleId,
});
