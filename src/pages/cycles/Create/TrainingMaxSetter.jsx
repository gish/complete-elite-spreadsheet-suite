import PropTypes from 'prop-types';
import React from 'react';
import * as R from 'ramda';
import TextField from '@material-ui/core/TextField';
import propTypes from '../../../proptypes';

const TrainingMaxSetter = ({maxes, onUpdate}) => {
  const change = id => event => {
    const newMaxValue = Number(event.target.value);
    const isEqualId = id =>
      R.pipe(
        R.prop('id'),
        R.equals(id),
      );
    R.pipe(
      R.map(R.ifElse(isEqualId(id), R.assoc('value', newMaxValue), R.identity)),
      onUpdate,
    )(maxes);
  };

  return (
    <React.Fragment>
      {maxes.map(max => (
        <TextField
          key={max.id}
          label={max.name}
          type="number"
          onChange={change(max.id)}
          defaultValue={max.value}
          margin="dense"
          fullWidth
          required
        />
      ))}
    </React.Fragment>
  );
};

TrainingMaxSetter.propTypes = {
  maxes: propTypes.trainingMaxes.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TrainingMaxSetter;
