import PropTypes from 'prop-types';

const trainingMaxes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }),
);

export default trainingMaxes;
