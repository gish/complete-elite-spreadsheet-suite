import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import propTypes from '../../../proptypes';

const styles = theme => ({
  createButton: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

const CyclesLister = ({cycles, onChoose, classes}) => (
  <div>
    <Typography variant="h4" gutterBottom>
      Saved cycles
    </Typography>
    <List component="nav">
      {cycles.map(cycle => (
        <ListItem component={Link} to={`/cycles/${cycle.id}`} button>
          <ListItemText primary={cycle.name} />
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

const mapStateToProps = state => ({
  cycles: state.cycles,
});

export default withStyles(styles)(connect(mapStateToProps)(CyclesLister));
