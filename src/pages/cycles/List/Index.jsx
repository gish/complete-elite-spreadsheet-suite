import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import propTypes from '../../../proptypes';

const CyclesLister = ({cycles, onChoose}) => (
  <div>
    <h1>Saved cycles</h1>
    <ul>
      {cycles.map(cycle => (
        <li key={cycle.name}>
          <Link to={`/cycles/${cycle.id}`}>{cycle.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

CyclesLister.propTypes = {
  cycles: PropTypes.arrayOf(propTypes.cycle.isRequired),
};

const mapStateToProps = state => ({
  cycles: state.cycles,
});

export default connect(mapStateToProps)(CyclesLister);
