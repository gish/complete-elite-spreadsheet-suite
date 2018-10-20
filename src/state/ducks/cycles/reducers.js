import * as types from './types';
import {createReducer} from '../../utils';

const reducer = createReducer([])({
  [types.CREATE_CYCLE]: (state, action) => [...state, action.payload],
});

export default reducer;
