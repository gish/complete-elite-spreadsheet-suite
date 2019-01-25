import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import * as R from 'ramda';
import {Cycle} from './components';
import propTypes from '../../../proptypes';
import * as actions from './../../../state/ducks/cycles/actions';
import isCompleted, {CYCLE} from './../../../utils/is-completed';

const styles = theme => ({
  createButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

const CyclesLister = ({cycles, onChoose, deleteCycle, classes}) => (
  <div>
    <Typography variant="h4" gutterBottom>
      Saved cycles
    </Typography>
    <List component="nav">
      {R.pipe(
        R.sort(a => (isCompleted(CYCLE, a) ? 1 : -1)),
        R.map(cycle => (
          <Cycle
            key={cycle.id}
            id={cycle.id}
            name={cycle.name}
            deleteCycle={deleteCycle}
          />
        )),
      )(cycles)}
    </List>
    <Fab
      color="primary"
      className={classes.createButton}
      component={Link}
      to={`/cycles/create`}>
      <AddIcon />
    </Fab>
  </div>
);

CyclesLister.propTypes = {
  cycles: PropTypes.arrayOf(propTypes.cycle.isRequired),
};

const mapDispatchToProps = dispatch => ({
  deleteCycle: id => () => dispatch(actions.deleteCycle(id)),
});

const mapStateToProps = state => ({
  cycles: state.cycles,
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CyclesLister),
);
