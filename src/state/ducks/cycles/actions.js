import * as types from './types';

export const createCycle = cycle => ({
  type: types.CREATE_CYCLE,
  payload: cycle,
});
