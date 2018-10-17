import PropTypes from 'prop-types';
import trainingMaxes from './training-maxes';

const savedCycle = PropTypes.shape({
  trainingMaxes: trainingMaxes.isRequired,
  name: PropTypes.string.isRequired,
  routineId: PropTypes.string.isRequired,
});

export default savedCycle;
