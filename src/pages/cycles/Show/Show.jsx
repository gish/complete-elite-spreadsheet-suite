import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import propTypes from '../../../proptypes';
import * as actions from './../../../state/ducks/cycles/actions';

const mRound = (value, interval) => Math.round(value / interval) * interval;
const getWeight = (exercise, trainingMaxes, percentage) => {
  const trainingMax = trainingMaxes.find(
    trainingMax => trainingMax.id === exercise.exerciseId,
  );
  return trainingMax ? mRound((trainingMax.value * percentage) / 100, 2.5) : '';
};

const styles = theme => ({
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  day: {
    marginBottom: theme.spacing.unit * 2,
    overflowX: 'auto',
  },
  week: {
    maxWidth: 340,
    margin: '0 auto',
  },
});

const Plan = ({cycleId, name, maxes, routine, markSetAsCompleted, classes}) => (
  <div>
    <Typography variant="h4" gutterBottom>
      {name}
    </Typography>
    {routine.weeks.map(week => (
      <div className={classes.week} key={week.id}>
        <Typography variant="h5" gutterBottom>
          Week {week.number}
        </Typography>

        <div>
          {week.days.map(day => (
            <div className={classes.day} key={day.id}>
              <Typography variant="h6">Day {day.number}</Typography>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="none" />
                    <TableCell padding="none">Exercise</TableCell>
                    <TableCell padding="none">Reps</TableCell>
                    <TableCell padding="none">Weight</TableCell>
                    <TableCell padding="none" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {day.sets.map(set => {
                    const {
                      exerciseId,
                      name,
                      reps,
                      percentage,
                      amrap,
                      comments,
                      completed,
                    } = set;
                    const weight = getWeight(set, maxes, percentage);
                    const amrapSign = amrap ? '+' : '';
                    const prettyComments = comments
                      ? ' ' + comments.join(', ')
                      : '';
                    const markCompleted = () =>
                      markSetAsCompleted(cycleId, week.id, day.id, set.id);
                    return (
                      <TableRow
                        className={classes.row}
                        onClick={markCompleted}
                        key={set.id}>
                        <TableCell padding="none">
                          {!!completed ? <DoneIcon /> : null}
                        </TableCell>
                        <TableCell padding="none">{exerciseId}</TableCell>
                        <TableCell padding="none">
                          {reps}
                          {amrapSign}
                        </TableCell>
                        <TableCell padding="none">{weight}</TableCell>
                        <TableCell padding="none">{prettyComments}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

Plan.propTypes = {
  name: PropTypes.string.isRequired,
  maxes: propTypes.trainingMaxes.isRequired,
  routine: propTypes.routine.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const cycleId = ownProps.match.params.id;
  const cycle = state.cycles.find(cycle => cycle.id === cycleId);
  const {name, maxes, routine} = cycle;
  return {
    cycleId,
    name,
    routine,
    maxes,
  };
};

const mapDispatchToProps = {
  markSetAsCompleted: actions.markSetAsCompleted,
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Plan),
);
