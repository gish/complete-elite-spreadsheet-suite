import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import propTypes from '../../../proptypes';

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
      const newMaxes = this.state.maxes.map(max => {
        if (max.id === id) {
          return {...max, value: newMaxValue};
        }
        return {...max};
      });
      this.setState({maxes: newMaxes});
      this.props.onUpdate(newMaxes);
    };
  }

  render() {
    const {maxes} = this.state;
    return (
      <React.Fragment>
        {maxes.map(max => (
          <TextField
            key={max.id}
            label={max.name}
            type="number"
            onChange={this.change(max.id)}
            defaultValue={max.value}
            margin="dense"
            fullWidth
            required
          />
        ))}
      </React.Fragment>
    );
  }
}

TrainingMaxSetter.propTypes = {
  maxes: propTypes.trainingMaxes.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TrainingMaxSetter;
