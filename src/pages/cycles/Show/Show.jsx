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
import * as R from 'ramda';
import Set from './components/Set';
import propTypes from '../../../proptypes';
import * as actions from './../../../state/ducks/cycles/actions';
import {
  isPerformed,
  isSkipped,
  isDone,
  SET,
  DAY,
  WEEK,
} from './../../../utils/is-status-type';

const styles = theme => ({
  day: {
    marginBottom: theme.spacing(2),
    overflowX: 'auto',
  },
  week: {
    maxWidth: 640,
    margin: '0 auto',
  },
});

const Plan = ({
  cycleId,
  name,
  maxes,
  routine,
  performSet,
  skipSet,
  classes,
}) => (
  <div>
    <Typography variant="h4" gutterBottom>
      {name}
    </Typography>
    {R.pipe(
      R.reject(isDone(WEEK)),
      R.map(week => (
        <div className={classes.week} key={week.id}>
          <Typography variant="h5" gutterBottom>
            Week {week.number}
          </Typography>
          <div>
            {R.pipe(
              R.reject(isDone(DAY)),
              R.map(day => (
                <div className={classes.day} key={day.id}>
                  <Typography variant="h6">Day {day.number}</Typography>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="none">Exercise</TableCell>
                        <TableCell padding="none">Reps</TableCell>
                        <TableCell padding="none">Weight</TableCell>
                        <TableCell padding="none" />
                        <TableCell padding="none" />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {R.map(set => {
                        const perform = performSet(
                          cycleId,
                          week.id,
                          day.id,
                          set.id,
                          Date.now(),
                        );
                        const skip = skipSet(
                          cycleId,
                          week.id,
                          day.id,
                          set.id,
                          Date.now(),
                        );
                        return (
                          <Set
                            key={set.id}
                            set={set}
                            maxes={maxes}
                            perform={perform}
                            skip={skip}
                            performed={isPerformed(SET, set)}
                            skipped={isSkipped(SET, set)}
                          />
                        );
                      }, day.sets)}
                    </TableBody>
                  </Table>
                </div>
              )),
            )(week.days)}
          </div>
        </div>
      )),
    )(routine.weeks)}
  </div>
);

Plan.propTypes = {
  name: PropTypes.string.isRequired,
  maxes: propTypes.trainingMaxes.isRequired,
  routine: propTypes.routine.isRequired,
  cycleId: PropTypes.string.isRequired,
  performSet: PropTypes.func.isRequired,
  skipSet: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
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
  performSet: R.thunkify(
    R.pipe(
      actions.performSet,
      dispatch,
    ),
  ),
  skipSet: R.thunkify(
    R.pipe(
      actions.skipSet,
      dispatch,
    ),
  ),
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Plan),
);
