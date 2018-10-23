import {storage} from '../utils';

const stateSaver = store => next => action => {
  const result = next(action);
  const state = store.getState();
  storage.set(state);
  return result;
};

export default stateSaver;
