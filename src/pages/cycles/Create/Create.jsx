import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import uuidv4 from 'uuid/v4';
import {Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
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
      value: 0,
    }));

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
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
    this.props.history.push(`/cycles/${id}`);
  }

  onChooseRoutine(routineId) {
    const maxes = getTrainingMaxesByRoutineId(routineId);
    this.setState({routineId, maxes});
  }

  render() {
    const {maxes, name, routineId} = this.state;
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
              selectedRoutineId={routineId}
              onChoose={routineId => this.onChooseRoutine(routineId)}
            />
          </div>
          <div className={classes.fieldWrapper}>
            <Typography variant="h5">Training maxes</Typography>
            <TrainingMaxSetter
              maxes={maxes}
              onUpdate={maxes => this.setState({maxes})}
              key={routineId}
            />
          </div>
          <div className={classes.buttonWrapper}>
            <Button
              component={Link}
              to={`/cycles`}
              variant="contained"
              color="default">
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

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps,
  )(Create),
);
