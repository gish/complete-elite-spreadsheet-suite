import PropTypes from 'prop-types';
import React from 'react';
import {hot} from 'react-hot-loader';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Routes} from './components';

class App extends React.Component {
  render() {
    const savedCycles = [];
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <AppBar position="static">
              <Typography variant="h6" color="inherit">
                Workout templates
              </Typography>
            </AppBar>
            <Routes />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default hot(module)(App);
