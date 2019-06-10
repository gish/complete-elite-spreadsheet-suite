import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as R from 'ramda';
import exercises from '../../../assets/exercises.json';

const Edit = ({name, weeks}) => (
  <div>
    <Typography variant="h4" gutterBottom>
      Edit {name}
    </Typography>
    {R.map(
      week => (
        <div key={week.id}>
          <Typography variant="h5" gutterBottom>
            Week {week.number}
          </Typography>
          <div>
            {R.map(
              day => (
                <div key={day.id}>
                  <Typography variant="h6">Day {day.number}</Typography>
                  <Table>
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
                      {R.map(
                        set => (
                          <TableRow key={set.id}>
                            <TableCell padding="none">
                              <NativeSelect value={set.exerciseId}>
                                {R.pipe(
                                  R.sortBy(R.prop('name')),
                                  R.map(({id, name}) => (
                                    <option value={id} key={id}>
                                      {name}
                                    </option>
                                  )),
                                )(exercises)}
                              </NativeSelect>
                            </TableCell>
                            <TableCell padding="none">
                              <Input value={set.reps} />
                            </TableCell>
                            <TableCell padding="none">
                              <Input
                                value={set.percentage}
                                endAdornment={
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ),
                        day.sets,
                      )}
                    </TableBody>
                  </Table>
                </div>
              ),
              week.days,
            )}
          </div>
        </div>
      ),
      weeks,
    )}
  </div>
);

Edit.propTypes = {
  name: PropTypes.string.isRequired,
  weeks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const routineId = ownProps.match.params.id;
  const routine = R.pipe(
    R.prop('routines'),
    R.find(R.propEq('id', routineId)),
  )(state);
  const {name, weeks} = routine;
  return {
    name,
    weeks,
  };
};

export default connect(mapStateToProps)(Edit);
