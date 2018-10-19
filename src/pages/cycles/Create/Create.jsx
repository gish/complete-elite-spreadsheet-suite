import PropTypes from 'prop-types';
import React from 'react';
import propTypes from '../../../proptypes';
import RoutineChooser from './RoutineChooser';
import TrainingMaxSetter from './TrainingMaxSetter';
import routines from '../../../assets/routines';

const getTrainingMaxesByRoutineId = routineId =>
  routines
    .find(routine => routine.id === routineId)
    .exercises.map(exercise => ({
      id: exercise.id,
      name: exercise.name,
      value: 110,
    }));

class Create extends React.Component {
  constructor(props) {
    super(props);
    const routine = routines[0];
    const routineId = routine.id;
    const maxes = getTrainingMaxesByRoutineId(routineId);
    this.state = {
      name: '',
      maxes,
      routineId,
    };
  }

  change(event) {
    const name = event.target.value;
    this.setState({name});
  }

  onSave(event) {
    event.preventDefault();
    console.log(this.state);
  }

  onChooseRoutine(routineId) {
    const maxes = getTrainingMaxesByRoutineId(routineId);
    this.setState({routineId, maxes});
  }

  render() {
    const {maxes, name, routineId} = this.state;
    return (
      <form onSubmit={event => this.onSave(event)}>
        <label>
          Cycle name
          <input
            type="text"
            required
            value={name}
            onChange={event => this.change(event)}
          />
        </label>
        <RoutineChooser
          routines={routines}
          selectedRoutineId={routineId}
          onChoose={routineId => this.onChooseRoutine(routineId)}
        />
        <TrainingMaxSetter
          maxes={maxes}
          onUpdate={maxes => this.setState({maxes})}
          key={routineId}
        />
        <button type="submit">Create cycle</button>
      </form>
    );
  }
}

Create.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default Create;
