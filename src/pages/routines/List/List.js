import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import * as R from 'ramda';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import selectRoutines from './../../../state/ducks/routines/selectors';

const RoutineList = ({routines}) => (
  <div>
    <Typography variant="h4" gutterBottom>
      Routines
    </Typography>
    <List component="nav">
      {R.pipe(
        R.sortBy(
          R.compose(
            R.toLower,
            R.prop('name'),
          ),
        ),
        R.map(routine => (
          <ListItem
            button
            key={routine.id}
            component={Link}
            to={`/routines/${routine.id}/edit`}>
            <ListItemText primary={routine.name} />
          </ListItem>
        )),
      )(routines)}
    </List>
  </div>
);

const mapStateToProps = state => ({
  routines: selectRoutines(state),
});

RoutineList.propTypes = {
  routines: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default R.pipe(connect(mapStateToProps))(RoutineList);
