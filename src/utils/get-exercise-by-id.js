import exercises from '../assets/exercises.json';
import * as R from 'ramda';

const getExerciseById = id => R.find(R.propEq('id', id), exercises);

export default getExerciseById;
