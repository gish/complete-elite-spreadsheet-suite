import PropTypes from 'prop-types';
import React from 'react';
import propTypes from '../proptypes';

const SavedCyclesLister = ({savedCycles, onChoose}) => (
  <div>
    <h1>Saved cycles</h1>
    <ul>
      {savedCycles.map(savedCycle => (
        <li key={savedCycle.name}>
          <button onClick={() => onChoose(savedCycle)}>
            {savedCycle.name}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

SavedCyclesLister.propTypes = {
  savedCycles: PropTypes.arrayOf(propTypes.savedCycle).isRequired,
  onChoose: PropTypes.func.isRequired,
};

export default SavedCyclesLister;
