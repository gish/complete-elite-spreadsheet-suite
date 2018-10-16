import PropTypes from 'prop-types';
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Plan from './Plan';
import RoutineChooser from './RoutineChooser';
import routines from '../assets/routines';
import TrainingMaxSetter from './TrainingMaxSetter';
import SaveDialog from './SaveDialog';
import SavedCyclesLister from './SavedCyclesLister';

const getRoutineById = (routines, id) =>
  routines.find(routine => id === routine.id);
const getTrainingMaxesByRoutine = routine =>
  routine.exercises.map(exercise => ({
    id: exercise.id,
    name: exercise.name,
    value: 110,
  }));

class App extends React.Component {
  constructor(props) {
    super(props);
    const selectedRoutine = routines[0];
    this.state = {
      selectedRoutineId: selectedRoutine.id,
      trainingMaxes: getTrainingMaxesByRoutine(selectedRoutine),
      savedCycles: [],
    };
  }

  onRoutineSelect(selectedRoutineId) {
    const selectedRoutine = getRoutineById(routines, selectedRoutineId);
    this.setState({
      selectedRoutineId,
      trainingMaxes: getTrainingMaxesByRoutine(selectedRoutine),
    });
  }

  onTrainingMaxUpdate(trainingMaxes) {
    this.setState({trainingMaxes});
  }

  onSaveCycle(name) {
    const cycle = {
      name,
      routineId: this.state.selectedRoutineId,
      trainingMaxes: this.state.trainingMaxes,
    };
    const savedCycles = [...this.state.savedCycles, cycle];
    this.setState({savedCycles});
  }

  onLoadCycle(cycle) {
    const selectedRoutineId = cycle.routineId;
    const trainingMaxes = cycle.trainingMaxes;
    this.setState({selectedRoutineId, trainingMaxes});
  }

  render() {
    const selectedRoutine = getRoutineById(
      routines,
      this.state.selectedRoutineId,
    );
    const {savedCycles, trainingMaxes} = this.state;
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <SavedCyclesLister
                  onChoose={cycle => this.onLoadCycle(cycle)}
                  savedCycles={savedCycles}
                />
                <Link to="/rest">rest</Link>
              </div>
            )}
          />
          <Route
            path="/rest"
            render={() => (
              <div>
                <RoutineChooser
                  routines={routines}
                  onChoose={e => this.onRoutineSelect(e)}
                  selectedRoutineId={this.state.selectedRoutineId}
                />
                <TrainingMaxSetter
                  maxes={trainingMaxes}
                  onUpdate={maxes => this.onTrainingMaxUpdate(maxes)}
                  key={this.state.selectedRoutineId}
                />
                <SaveDialog onSave={event => this.onSaveCycle(event)} />
                <Plan template={selectedRoutine} maxes={trainingMaxes} />
              </div>
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
