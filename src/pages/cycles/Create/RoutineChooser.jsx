import PropTypes from 'prop-types';
import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import propTypes from '../../../proptypes';

const onChange = callback => event => callback(event.target.value);

const RoutineChooser = ({routines, onChoose, selectedRoutineId}) => (
  <Select onChange={onChange(onChoose)} value={selectedRoutineId} fullWidth>
    {routines.map(routine => (
      <MenuItem key={routine.name} value={routine.id}>
        {routine.name}
      </MenuItem>
    ))};
  </Select>
);

RoutineChooser.propTypes = {
  routines: PropTypes.arrayOf(propTypes.routine.isRequired),
  onChoose: PropTypes.func.isRequired,
  selectedRoutineId: PropTypes.string.isRequired,
};

export default RoutineChooser;
