import PropTypes from 'prop-types';
import React from 'react';
import * as R from 'ramda';
import {withStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBox from '@material-ui/icons/CheckBoxOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {setConfig, cold} from 'react-hot-loader';
import {getExerciseById} from '../../../../utils';

const styles = theme => ({
  performed: {
    color: theme.palette.text.disabled,
  },
  skipped: {
    textDecoration: 'line-through',
  },
});

const getWeight = (exerciseId, trainingMaxes, percentage) => {
  const trainingMax = trainingMaxes.find(
    trainingMax => trainingMax.id === exerciseId,
  );
  return trainingMax ? mRound((trainingMax.value * percentage) / 100, 2.5) : '';
};

const mRound = (value, interval) => Math.round(value / interval) * interval;

const Set = ({set, maxes, perform, performed, skip, skipped, classes}) => {
  const {exerciseId, reps, percentage, amrap, comments} = set;
  const exercise = getExerciseById(exerciseId);
  const weight = getWeight(exerciseId, maxes, percentage);
  const amrapSign = amrap ? '+' : '';
  const prettyComments = comments ? ' ' + comments.join(', ') : '';

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuClick = event => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);
  const handlePerform = () => perform() || closeMenu();
  const handleSkip = () => skip() || closeMenu();
  const cellClasses = R.join(' ', [
    skipped ? classes.skipped : '',
    performed ? classes.performed : '',
  ]);
  return (
    <TableRow>
      <TableCell padding="none" className={cellClasses}>
        {exercise.name}
      </TableCell>
      <TableCell padding="none" className={cellClasses}>
        {reps}
        {amrapSign}
      </TableCell>
      <TableCell padding="none" className={cellClasses}>
        {weight}
      </TableCell>
      <TableCell padding="none" className={cellClasses}>
        {prettyComments}
      </TableCell>
      <TableCell padding="none" className={cellClasses}>
        <IconButton onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
          <MenuItem onClick={handlePerform}>Perform</MenuItem>
          <MenuItem onClick={handleSkip}>Skip</MenuItem>
        </Menu>
      </TableCell>
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
  performed: PropTypes.bool.isRequired,
  skipped: PropTypes.bool.isRequired,
  maxes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
  perform: PropTypes.func.isRequired,
  skip: PropTypes.func.isRequired,
};
setConfig({pureSFC: true});

const memoizeComponent = props => component =>
  React.memo(component, (prev, next) =>
    R.all(
      R.pipe(
        R.split('.'),
        path => R.equals(R.path(path, prev), R.path(path, next)),
      ),
      props,
    ),
  );

export default R.pipe(
  memoizeComponent(['set.id', 'performed', 'skipped']),
  withStyles(styles),
  cold,
)(Set);
