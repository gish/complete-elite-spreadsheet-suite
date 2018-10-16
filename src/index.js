import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './state/store';
import {App} from './components';

const container = document.getElementById('app');

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(<Root />, container);
