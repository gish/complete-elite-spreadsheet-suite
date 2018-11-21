import PropTypes from 'prop-types';
import trainingMaxes from './training-maxes';

const cycle = PropTypes.shape({
  maxes: trainingMaxes.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
});

export default cycle;
