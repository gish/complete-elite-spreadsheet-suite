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

const Set = ({set, completed, maxes, toggleCompleted}) => {
  const {exerciseId, reps, percentage, amrap, comments} = set;
  const weight = getWeight(set, maxes, percentage);
  const amrapSign = amrap ? '+' : '';
  const prettyComments = comments ? ' ' + comments.join(', ') : '';
  return (
    <TableRow onClick={toggleCompleted}>
      <TableCell padding="none">
        <CompletedStatus completed={completed} />
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
  toggleCompleted: PropTypes.func.isRequired,
};

export default Set;
