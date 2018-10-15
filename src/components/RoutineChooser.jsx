import PropTypes from 'prop-types';
import React from 'react';
import propTypes from '../proptypes';

const onChange = callback => event => callback(event.target.value);

const RoutineChooser = ({routines, onChoose, selectedRoutineId}) => (
  <select onChange={onChange(onChoose)} value={selectedRoutineId}>
    {routines.map(routine => (
      <option key={routine.name} value={routine.id}>
        {routine.name}
      </option>
    ))};
  </select>
);

RoutineChooser.propTypes = {
  routines: PropTypes.arrayOf(propTypes.routine.isRequired),
  selectedRoutineId: PropTypes.string,
  onChoose: PropTypes.func.isRequired,
};

export default RoutineChooser;
