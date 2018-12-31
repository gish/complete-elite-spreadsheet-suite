import * as R from 'ramda';
import * as types from './types';
import {createReducer} from '../../utils';

const toggleSetCompleted = (state, action) => {
  const findPos = (state, id, path) =>
    R.findIndex(R.propEq('id', id))(R.path(path, state));
  const cyclePos = R.findIndex(R.propEq('id', action.payload.cycleId))(state);
  const weekPos = findPos(state, action.payload.weekId, [
    cyclePos,
    'routine',
    'weeks',
  ]);
  const dayPos = findPos(state, action.payload.dayId, [
    cyclePos,
    'routine',
    'weeks',
    weekPos,
    'days',
  ]);
  const setPos = findPos(state, action.payload.setId, [
    cyclePos,
    'routine',
    'weeks',
    weekPos,
    'days',
    dayPos,
    'sets',
  ]);
  const exerciseLens = R.lensPath([
    cyclePos,
    'routine',
    'weeks',
    weekPos,
    'days',
    dayPos,
    'sets',
    setPos,
  ]);
  const setCompleted = () =>
    R.mergeRight(R.view(exerciseLens, state), {
      completed: action.payload.completed,
    });
  return R.set(exerciseLens, setCompleted(), state);
};

const reducer = createReducer([])({
  [types.CREATE_CYCLE]: (state, action) => [...state, action.payload],
  [types.DELETE_CYCLE]: (state, action) =>
    state.filter(cycle => cycle.id !== action.payload),
  [types.TOGGLE_SET_COMPLETED]: (state, action) =>
    toggleSetCompleted(state, action),
});

export default reducer;
