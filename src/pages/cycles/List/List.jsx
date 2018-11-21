import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import propTypes from '../../../proptypes';
import * as actions from './../../../state/ducks/cycles/actions';

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
      {cycles.map(cycle => (
        <ListItem
          component={Link}
          to={`/cycles/${cycle.id}`}
          button
          key={cycle.id}>
          <ListItemText primary={cycle.name} />
          <ListItemSecondaryAction>
            <IconButton onClick={deleteCycle(cycle.id)}>
              <DeleteOutlinedIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
    <Button
      variant="fab"
      color="primary"
      className={classes.createButton}
      component={Link}
      to={`/cycles/create`}>
      <AddIcon />
    </Button>
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
