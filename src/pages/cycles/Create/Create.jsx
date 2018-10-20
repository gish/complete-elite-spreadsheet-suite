import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import uuidv4 from 'uuid/v4';
import RoutineChooser from './RoutineChooser';
import TrainingMaxSetter from './TrainingMaxSetter';
import routines from '../../../assets/routines';
import * as actions from './../../../state/ducks/cycles/actions';

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

  changeName(event) {
    const name = event.target.value;
    this.setState({name});
  }

  onSave(event) {
    event.preventDefault();
    const {routineId, name, maxes} = this.state;
    const id = uuidv4();
    this.props.create({id, routineId, name, maxes});
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
            onChange={event => this.changeName(event)}
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
  create: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  create: actions.createCycle,
};

export default connect(
  null,
  mapDispatchToProps,
)(Create);
