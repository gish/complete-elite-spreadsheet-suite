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
import propTypes from '../../../proptypes';

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

const Plan = ({name, maxes, routine, classes}) => (
  <div>
    <Typography variant="h4" gutterBottom>
      {name}
    </Typography>
    {routine.weeks.map(week => (
      <div className={classes.week}>
        <Typography variant="h5" gutterBottom>
          Week {week.number}
        </Typography>

        <div>
          {week.days.map(day => (
            <div className={classes.day}>
              <Typography variant="h6">Day {day.number}</Typography>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="none">Exercise</TableCell>
                    <TableCell padding="none">Sets&times;Reps</TableCell>
                    <TableCell padding="none">Weight</TableCell>
                    <TableCell padding="none" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {day.exercises.map(exercise => {
                    const {
                      exerciseId,
                      name,
                      sets,
                      reps,
                      percentage,
                      amrap,
                      comments,
                    } = exercise;
                    const weight = getWeight(exercise, maxes, percentage);
                    const amrapSign = amrap ? '+' : '';
                    const prettyComments = comments
                      ? ' ' + comments.join(', ')
                      : '';
                    const setsCount = exercise.sets || 1;
                    return (
                      <TableRow className={classes.row}>
                        <TableCell padding="none">{exerciseId}</TableCell>
                        <TableCell padding="none">
                          {setsCount}&times;{reps}
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
    name,
    routine,
    maxes,
  };
};

export default withStyles(styles)(connect(mapStateToProps)(Plan));
