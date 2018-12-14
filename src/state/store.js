import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import * as reducers from './ducks';
import {storage} from './utils';
import {stateSaver} from './middlewares';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = routines => ({...storage.get(), routines});

export default routines =>
  createStore(
    combineReducers(reducers),
    initialState(routines),
    composeEnhancers(applyMiddleware(stateSaver)),
  );
