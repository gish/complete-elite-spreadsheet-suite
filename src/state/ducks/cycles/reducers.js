import * as R from 'ramda';
import * as types from './types';
import {createReducer} from '../../utils';

const COMPLETED = 'completed';

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
const completeSet = (state, action) => {
  const {cycleId, weekId, dayId, setId, timestamp} = action.payload;
  const setLens = getSetLens(state, cycleId, weekId, dayId, setId);
  const setCompleted = () =>
    R.mergeRight(R.view(setLens, state), {
      status: {type: COMPLETED, timestamp},
    });
  return R.set(setLens, setCompleted(), state);
};

const reducer = createReducer([])({
  [types.CREATE_CYCLE]: (state, action) => [...state, action.payload],
  [types.DELETE_CYCLE]: (state, action) =>
    state.filter(cycle => cycle.id !== action.payload),
  [types.COMPLETE_SET]: (state, action) => completeSet(state, action),
});

export default reducer;
