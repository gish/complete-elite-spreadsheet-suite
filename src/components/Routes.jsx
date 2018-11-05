import PropTypes from 'prop-types';
import React from 'react';
import {HashRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import {hot} from 'react-hot-loader';

import * as cyclesPages from '../pages/cycles';

const uuidV4 =
  '[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => <Redirect to="/cycles" />} />
          <Route
            exact
            path={['/cycles', '/cycles/create']}
            component={cyclesPages.List}
          />
          <Route exact path="/cycles/create" component={cyclesPages.Create} />
          <Route
            exact
            path={`/cycles/:id(${uuidV4})`}
            component={cyclesPages.Show}
          />
        </div>
      </Router>
    );
  }
}

export default hot(module)(Routes);
