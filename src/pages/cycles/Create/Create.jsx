import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import uuidv4 from 'uuid/v4';
import {Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import RoutineChooser from './RoutineChooser';
import TrainingMaxSetter from './TrainingMaxSetter';
import routines from '../../../assets/routines';
import * as actions from './../../../state/ducks/cycles/actions';

const getRoutineById = routineId =>
  routines.find(routine => routine.id === routineId);

const getTrainingMaxesByRoutineId = routineId =>
  getRoutineById(routineId).exercises.map(exercise => ({
    id: exercise.id,
    name: exercise.name,
    value: 0,
  }));

const styles = theme => ({
  layout: {
    width: 'auto',
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

class Create extends React.Component {
  constructor(props) {
    super(props);
    const routine = routines[0];
    const maxes = getTrainingMaxesByRoutineId(routine.id);
    this.state = {
      name: '',
      maxes,
      routine,
    };
  }

  changeName(event) {
    const name = event.target.value;
    this.setState({name});
  }

  onSave(event) {
    event.preventDefault();
    const {routine, name, maxes} = this.state;
    const id = uuidv4();
    this.props.create({id, routine, name, maxes});
    this.props.history.push(`/cycles/${id}`);
  }

  onChooseRoutine(routineId) {
    const maxes = getTrainingMaxesByRoutineId(routineId);
    const routine = getRoutineById(routineId);
    this.setState({routine, maxes});
  }

  render() {
    const {maxes, name, routine} = this.state;
    const {classes} = this.props;
    return (
      <div className={classes.layout}>
        <Typography variant="h4" gutterBottom>
          Create cycle
        </Typography>
        <form onSubmit={event => this.onSave(event)}>
          <div className={classes.fieldWrapper}>
            <TextField
              label="Cycle name"
              type="text"
              value={name}
              onChange={event => this.changeName(event)}
              fullWidth
              required
            />
          </div>
          <div className={classes.fieldWrapper}>
            <RoutineChooser
              routines={routines}
              selectedRoutineId={routine.id}
              onChoose={routineId => this.onChooseRoutine(routineId)}
            />
          </div>
          <div className={classes.fieldWrapper}>
            <Typography variant="h5">Training maxes</Typography>
            <TrainingMaxSetter
              maxes={maxes}
              onUpdate={maxes => this.setState({maxes})}
              key={routine.id}
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
  }
}

Create.propTypes = {
  create: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  create: actions.createCycle,
};

const EnhancedCreate = withStyles(styles)(
  connect(
    null,
    mapDispatchToProps,
  )(Create),
);

const CreateModal = props => (
  <Modal open>
    <EnhancedCreate {...props} />
  </Modal>
);

export default CreateModal;
