import * as R from 'ramda';
import * as types from './types';
import {COMPLETED, SKIPPED} from './constants';
import {createReducer} from '../../utils';

const getSetLens = (state, cycleId, weekId, dayId, setId) => {
  const findPos = (state, id, path) =>
    R.findIndex(R.propEq('id', id))(R.path(path, state));
  const cyclePos = R.findIndex(R.propEq('id', cycleId))(state);
  const weekPos = findPos(state, weekId, [cyclePos, 'routine', 'weeks']);
  const dayPos = findPos(state, dayId, [
    cyclePos,
    'routine',
    'weeks',
    weekPos,
    'days',
  ]);
  const setPos = findPos(state, setId, [
    cyclePos,
    'routine',
    'weeks',
    weekPos,
    'days',
    dayPos,
    'sets',
  ]);
  return R.lensPath([
    cyclePos,
    'routine',
    'weeks',
    weekPos,
    'days',
    dayPos,
    'sets',
    setPos,
  ]);
};

const updateSetType = (state, action, type) => {
  const {cycleId, weekId, dayId, setId, timestamp} = action.payload;
  const setLens = getSetLens(state, cycleId, weekId, dayId, setId);
  const setUpdated = () =>
    R.mergeRight(R.view(setLens, state), {
      status: {type, timestamp},
    });
  return R.set(setLens, setUpdated(), state);
};

const completeSet = (state, action) => updateSetType(state, action, COMPLETED);
const skipSet = (state, action) => updateSetType(state, action, SKIPPED);

const reducer = createReducer([])({
  [types.CREATE_CYCLE]: (state, action) => [...state, action.payload],
  [types.DELETE_CYCLE]: (state, action) =>
    state.filter(cycle => cycle.id !== action.payload),
  [types.COMPLETE_SET]: (state, action) => completeSet(state, action),
  [types.SKIP_SET]: (state, action) => skipSet(state, action),
});

export default reducer;
