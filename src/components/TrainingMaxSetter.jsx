import PropTypes from 'prop-types';
import React from 'react';
import propTypes from '../proptypes';

class TrainingMaxSetter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxes: props.maxes,
    };
  }
  change(id) {
    return event => {
      const newMaxValue = Number(event.target.value);
      const newMaxes = [...this.state.maxes].map(max => {
        if (max.id === id) {
          return {...max, value: newMaxValue};
        }
        return {...max};
      });
      this.setState({maxes: newMaxes});
    };
  }

  onUpdate(event) {
    event.preventDefault();
    this.props.onUpdate(this.state.maxes);
  }

  render() {
    const {maxes} = this.state;
    return (
      <form onSubmit={event => this.onUpdate(event)}>
        <ul>
          {maxes.map(max => (
            <li key={max.id}>
              <label>
                {max.name}
                <input
                  type="number"
                  onChange={this.change(max.id)}
                  value={max.value}
                />
              </label>
            </li>
          ))}
        </ul>
        <button type="submit">Set training maxes</button>
      </form>
    );
  }
}

TrainingMaxSetter.propTypes = {
  maxes: propTypes.trainingMaxes.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TrainingMaxSetter;
