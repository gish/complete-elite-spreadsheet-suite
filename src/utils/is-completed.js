import * as R from 'ramda';

export const CYCLE = 'CYCLE';
export const WEEK = 'WEEK';
export const DAY = 'DAY';
export const SET = 'SET';

const isSetCompleted = R.pipe(
  R.propOr({}, 'status'),
  R.propOr('', 'type'),
  R.equals('completed'),
);

const isDayCompleted = R.pipe(
  R.prop('sets'),
  R.defaultTo([]),
  R.all(isSetCompleted),
);

const isWeekCompleted = R.pipe(
  R.prop('days'),
  R.defaultTo([]),
  R.all(isDayCompleted),
);

const isCycleCompleted = R.pipe(
  R.path(['routine', 'weeks']),
  R.defaultTo([]),
  R.all(isWeekCompleted),
);

const periods = {
  [CYCLE]: isCycleCompleted,
  [WEEK]: isWeekCompleted,
  [DAY]: isDayCompleted,
  [SET]: isSetCompleted,
};

const isCompleted = R.curry((unit, period) =>
  R.defaultTo(R.identity, R.prop(unit, periods))(period),
);

export default isCompleted;
