import PropTypes from 'prop-types';
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {hot} from 'react-hot-loader';
import cyclesPages from './pages/cycles';

class App extends React.Component {
  render() {
    const savedCycles = [];
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <Link to="cycles/create">Create cycle</Link>
              </div>
            )}
          />
          <Route exact path="/cycles/create" component={cyclesPages.Create} />
        </div>
      </Router>
    );
  }
}

export default hot(module)(App);
