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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import routines from '../../../assets/routines';
import propTypes from '../../../proptypes';

const mRound = (value, interval) => Math.round(value / interval) * interval;
const getWeight = (exercise, trainingMaxes, percentage) => {
  const trainingMax = trainingMaxes.find(
    trainingMax => trainingMax.id === exercise.id,
  );
  return trainingMax ? mRound((trainingMax.value * percentage) / 100, 2.5) : '';
};

const styles = theme => ({
  table: {maxWidth: 340},
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  day: {
    marginBottom: theme.spacing.unit * 2,
  },
});

const Plan = ({name, maxes, routine, classes}) => (
  <div>
    <Typography variant="h4" gutterBottom>
      {name}
    </Typography>
    {routine.weeks.map(week => (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" gutterBottom>
            Week {week.number}
          </Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <div>
            {week.days.map(day => (
              <div className={classes.day}>
                <Typography variant="h6">Day {day.number}</Typography>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Exercise</TableCell>
                      <TableCell>Sets&times;Reps</TableCell>
                      <TableCell>Weight</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {day.exercises.map(exercise => {
                      const {
                        id,
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
                          <TableCell>{id}</TableCell>
                          <TableCell>
                            {setsCount}&times;{reps}
                            {amrapSign}
                          </TableCell>
                          <TableCell>{weight}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
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
  const {name, maxes} = cycle;
  const routine = routines.find(routine => cycle.routineId === routine.id);
  return {
    name,
    routine,
    maxes,
  };
};

export default withStyles(styles)(connect(mapStateToProps)(Plan));
