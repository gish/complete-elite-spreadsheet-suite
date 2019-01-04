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
import Set from './components/Set';
import propTypes from '../../../proptypes';
import * as actions from './../../../state/ducks/cycles/actions';
import isCompleted, {SET, DAY, WEEK} from './../../../utils/is-completed';

const styles = theme => ({
  day: {
    marginBottom: theme.spacing.unit * 2,
    overflowX: 'auto',
  },
  week: {
    maxWidth: 340,
    margin: '0 auto',
  },
});

const Plan = ({cycleId, name, maxes, routine, toggleSetCompleted, classes}) => (
  <div>
    <Typography variant="h4" gutterBottom>
      {name}
    </Typography>
    {routine.weeks
      .filter(week => !isCompleted(WEEK, week))
      .map(week => (
        <div className={classes.week} key={week.id}>
          <Typography variant="h5" gutterBottom>
            Week {week.number}
          </Typography>

          <div>
            {week.days
              .filter(day => !isCompleted(DAY, day))
              .map(day => (
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
                      {day.sets.map(set => (
                        <Set
                          key={set.id}
                          set={set}
                          cycleId={cycleId}
                          weekId={week.id}
                          dayId={day.id}
                          maxes={maxes}
                          toggleCompleted={toggleSetCompleted}
                        />
                      ))}
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

const mapDispatchToProps = dispatch => ({
  toggleSetCompleted: (cycleId, weekId, dayId, setId, completed) => () => {
    dispatch(
      actions.toggleSetCompleted(cycleId, weekId, dayId, setId, completed),
    );
  },
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Plan),
);
