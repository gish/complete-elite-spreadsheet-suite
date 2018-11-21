import PropTypes from 'prop-types';
import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import propTypes from '../../../proptypes';

const onChange = callback => event => callback(event.target.value);

const RoutineChooser = ({routines, onChoose, selectedRoutineIds}) => (
  <Select
    multiple
    onChange={onChange(onChoose)}
    value={selectedRoutineIds}
    fullWidth>
    {routines.sort((a, b) => a.name.localeCompare(b.name)).map(routine => (
      <MenuItem key={routine.name} value={routine.id}>
        {routine.name}
      </MenuItem>
    ))};
  </Select>
);

RoutineChooser.propTypes = {
  routines: PropTypes.arrayOf(propTypes.routine.isRequired),
  onChoose: PropTypes.func.isRequired,
  selectedRoutineIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RoutineChooser;
