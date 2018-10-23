import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import * as reducers from './ducks';
import {storage} from './utils';
import {stateSaver} from './middlewares';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = storage.get();

export default createStore(
  combineReducers(reducers),
  initialState,
  composeEnhancers(applyMiddleware(stateSaver)),
);
