import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import * as R from 'ramda';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const typographyColorByCompletion = R.ifElse(
  R.equals(true),
  R.always('textSecondary'),
  R.always('textPrimary'),
);

const Cycle = ({id, name, completed, deleteCycle}) => (
  <ListItem component={Link} to={`/cycles/${id}`} button>
    <ListItemText
      primary={name}
      primaryTypographyProps={{color: typographyColorByCompletion(completed)}}
    />
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
  completed: PropTypes.bool.isRequired,
  deleteCycle: PropTypes.func.isRequired,
};

export default Cycle;
