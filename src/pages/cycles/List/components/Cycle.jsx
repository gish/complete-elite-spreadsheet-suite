import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const Cycle = ({id, name, deleteCycle}) => (
  <ListItem component={Link} to={`/cycles/${id}`} button>
    <ListItemText primary={name} />
    <ListItemSecondaryAction>
      <IconButton onClick={deleteCycle(id)}>
        <DeleteOutlinedIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

Cycle.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  deleteCycle: PropTypes.func.isRequired,
};

export default Cycle;
