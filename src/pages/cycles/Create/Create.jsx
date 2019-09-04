import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import uuidv4 from 'uuid/v4';
import * as R from 'ramda';
import {Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import RoutineChooser from './RoutineChooser';
import TrainingMaxSetter from './TrainingMaxSetter';
import * as actions from './../../../state/ducks/cycles/actions';
import selectRoutines from './../../../state/ducks/routines/selectors';
import {mergeRoutines, assignIds, getExerciseById} from './../../../utils';

const getRoutineById = routines => routineId =>
  routines.find(routine => routine.id === routineId);

const getTrainingMaxesByRoutine = routine =>
  routine.exercises.map(exerciseId => {
    const exercise = getExerciseById(exerciseId);
    return {
      id: exercise.id,
      name: exercise.name,
      value: 0,
    };
  });

const styles = theme => ({
  layout: {
    display: 'block', // Fix IE 11 issue.
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    width: '90%',
    margin: 0,

    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  fieldWrapper: {
    marginBottom: theme.spacing.unit * 2,
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const Create = ({routines, create, classes, history}) => {
  const [mergedRoutines, setMergedRoutines] = useState([]);
  const [selectedRoutineIds, setSelectedRoutineIds] = useState([]);
  const [maxes, setMaxes] = useState([]);
  const [name, setName] = useState('');

  const onSave = event => {
    event.preventDefault();
    const id = uuidv4();
    create({id, routine: mergedRoutines, name, maxes});
    history.push(`/cycles/${id}`);
  };

  const onChooseRoutines = ids => {
    const mergedRoutines = R.pipe(
      R.map(getRoutineById(routines)),
      mergeRoutines,
      assignIds,
    )(ids);
    const maxes = getTrainingMaxesByRoutine(mergedRoutines);
    setSelectedRoutineIds(ids);
    setMergedRoutines(mergedRoutines);
    R.pipe(
      getTrainingMaxesByRoutine,
      setMaxes,
    )(mergedRoutines);
  };

  return (
    <div className={classes.layout}>
      <Typography variant="h4" gutterBottom>
        Create cycle
      </Typography>
      <form onSubmit={onSave}>
        <div className={classes.fieldWrapper}>
          <TextField
            label="Cycle name"
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
            fullWidth
            required
          />
        </div>
        <div className={classes.fieldWrapper}>
          <RoutineChooser
            routines={routines}
            selectedRoutineIds={selectedRoutineIds}
            onChoose={onChooseRoutines}
          />
        </div>
        <div className={classes.fieldWrapper}>
          <Typography variant="h5">Training maxes</Typography>
          <TrainingMaxSetter
            maxes={maxes}
            onUpdate={setMaxes}
            key={selectedRoutineIds}
          />
        </div>
        <div className={classes.buttonWrapper}>
          <Button component={Link} to={`/cycles`} color="default">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="secondary">
            Create cycle
          </Button>
        </div>
      </form>
    </div>
  );
};

Create.propTypes = {
  create: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  routines: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({routines: selectRoutines(state)});

const mapDispatchToProps = {
  create: actions.createCycle,
};

const EnhancedCreate = withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Create),
);

const CreateModal = props => (
  <Modal open>
    <EnhancedCreate {...props} />
  </Modal>
);

export default CreateModal;
