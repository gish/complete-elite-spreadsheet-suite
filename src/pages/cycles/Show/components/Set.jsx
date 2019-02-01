import PropTypes from 'prop-types';
import React from 'react';
import * as R from 'ramda';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBox from '@material-ui/icons/CheckBoxOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {cold} from 'react-hot-loader';
import isCompleted, {SET} from './../../../../utils/is-completed';

const getWeight = (exercise, trainingMaxes, percentage) => {
  const trainingMax = trainingMaxes.find(
    trainingMax => trainingMax.id === exercise.exerciseId,
  );
  return trainingMax ? mRound((trainingMax.value * percentage) / 100, 2.5) : '';
};

const mRound = (value, interval) => Math.round(value / interval) * interval;

const Set = ({set, completed, maxes, complete, skip}) => {
  const {exerciseId, reps, percentage, amrap, comments} = set;
  const weight = getWeight(set, maxes, percentage);
  const amrapSign = amrap ? '+' : '';
  const prettyComments = comments ? ' ' + comments.join(', ') : '';

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuClick = event => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);
  const handleComplete = () => complete() || closeMenu();
  const handleSkip = () => skip() || closeMenu();

  return (
    <TableRow>
      <TableCell padding="none">
        <IconButton onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
          <MenuItem onClick={handleComplete}>Complete</MenuItem>
          <MenuItem onClick={handleSkip}>Skip</MenuItem>
        </Menu>
      </TableCell>
      <TableCell padding="none">{exerciseId}</TableCell>
      <TableCell padding="none">
        {reps}
        {amrapSign}
      </TableCell>
      <TableCell padding="none">{weight}</TableCell>
      <TableCell padding="none">{prettyComments}</TableCell>
    </TableRow>
  );
};

Set.propTypes = {
  set: PropTypes.shape({
    id: PropTypes.string.isRequired,
    exerciseId: PropTypes.string,
    reps: PropTypes.number.isRequired,
    percentage: PropTypes.number.isRequired,
    amrap: PropTypes.bool,
    comments: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  completed: PropTypes.bool.isRequired,
  maxes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
  complete: PropTypes.func.isRequired,
  skip: PropTypes.func.isRequired,
};

export default cold(Set);
