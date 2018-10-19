import PropTypes from 'prop-types';
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Index from './pages/Index';
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
                <Index
                  onChoose={() => console.log(arguments)}
                  savedCycles={savedCycles}
                />
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

export default App;
