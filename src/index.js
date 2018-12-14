import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './state/store';
import App from './App';

const container = document.getElementById('app');
const routines = __ROUTINES__;

const Root = () => (
  <Provider store={store(routines)}>
    <App />
  </Provider>
);
ReactDOM.render(<Root />, container);
