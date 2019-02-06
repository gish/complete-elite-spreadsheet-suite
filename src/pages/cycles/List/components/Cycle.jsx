import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import * as R from 'ramda';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const typographyColorByDoneness = R.ifElse(
  R.equals(true),
  R.always('textSecondary'),
  R.always('textPrimary'),
);

const Cycle = ({id, name, done, deleteCycle}) => (
  <ListItem component={Link} to={`/cycles/${id}`} button>
    <ListItemText
      primary={name}
      primaryTypographyProps={{color: typographyColorByDoneness(done)}}
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
  done: PropTypes.bool.isRequired,
  deleteCycle: PropTypes.func.isRequired,
};

export default Cycle;
