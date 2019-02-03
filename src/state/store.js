import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import * as reducers from './ducks';
import {storage} from './utils';
import {stateSaver} from './middlewares';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = ({routines, exercises}) => ({
  ...storage.get(),
  routines,
  exercises,
});

export default state =>
  createStore(
    combineReducers(reducers),
    initialState(state),
    composeEnhancers(applyMiddleware(stateSaver)),
  );
