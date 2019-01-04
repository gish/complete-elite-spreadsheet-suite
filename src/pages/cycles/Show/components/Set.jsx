import PropTypes from 'prop-types';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBox from '@material-ui/icons/CheckBoxOutlined';
import isCompleted, {SET} from './../../../../utils/is-completed';

const getWeight = (exercise, trainingMaxes, percentage) => {
  const trainingMax = trainingMaxes.find(
    trainingMax => trainingMax.id === exercise.exerciseId,
  );
  return trainingMax ? mRound((trainingMax.value * percentage) / 100, 2.5) : '';
};

const mRound = (value, interval) => Math.round(value / interval) * interval;

const CompletedStatus = ({completed}) =>
  completed ? <CheckBox /> : <CheckBoxOutlineBlank />;

const Set = ({set, maxes, cycleId, weekId, dayId, toggleCompleted}) => {
  const {exerciseId, reps, percentage, amrap, comments} = set;
  const weight = getWeight(set, maxes, percentage);
  const amrapSign = amrap ? '+' : '';
  const prettyComments = comments ? ' ' + comments.join(', ') : '';
  const toggleCompletedDefined = toggleCompleted(
    cycleId,
    weekId,
    dayId,
    set.id,
    !isCompleted(SET, set),
  );
  return (
    <TableRow onClick={toggleCompletedDefined}>
      <TableCell padding="none">
        <CompletedStatus completed={isCompleted(SET, set)} />
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
  maxes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
  cycleId: PropTypes.string.isRequired,
  weekId: PropTypes.string.isRequired,
  dayId: PropTypes.string.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
};

export default Set;