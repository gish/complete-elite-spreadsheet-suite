import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import propTypes from '../../../proptypes';

const CyclesLister = ({cycles, onChoose}) => (
  <div>
    <h1>Saved cycles</h1>
    <List component="nav">
      {cycles.map(cycle => (
        <ListItem component={Link} to={`/cycles/${cycle.id}`} button>
          <ListItemText inset primary={cycle.name} />
        </ListItem>
      ))}
    </List>
  </div>
);

CyclesLister.propTypes = {
  cycles: PropTypes.arrayOf(propTypes.cycle.isRequired),
};

const mapStateToProps = state => ({
  cycles: state.cycles,
});

export default connect(mapStateToProps)(CyclesLister);
