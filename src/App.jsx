import PropTypes from 'prop-types';
import React from 'react';
import {hot} from 'react-hot-loader';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import {Routes} from './components';

const styles = theme => ({
  container: {
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 1,
    paddingRight: theme.spacing.unit * 1,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  menuButton: {
    marginRight: 20,
  },
});

const App = ({classes}) => (
  <React.Fragment>
    <CssBaseline />
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          Complete Elite Sweet Spreadsheet Suite
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={classes.container}>
      <Routes />
    </div>
  </React.Fragment>
);

export default withStyles(styles)(hot(module)(App));
