import * as R from 'ramda';

export const CYCLE = 'CYCLE';
export const WEEK = 'WEEK';
export const DAY = 'DAY';
export const SET = 'SET';

const isSetStatusType = type =>
  R.pipe(
    R.propOr({}, 'status'),
    R.propOr('', 'type'),
    R.equals(type),
  );

const isDayStatusType = type =>
  R.pipe(
    R.prop('sets'),
    R.defaultTo([]),
    R.all(isSetStatusType(type)),
  );

const isWeekStatusType = type =>
  R.pipe(
    R.prop('days'),
    R.defaultTo([]),
    R.all(isDayStatusType(type)),
  );

const isCycleStatusType = type =>
  R.pipe(
    R.path(['routine', 'weeks']),
    R.defaultTo([]),
    R.all(isWeekStatusType(type)),
  );

const periods = {
  [CYCLE]: isCycleStatusType,
  [WEEK]: isWeekStatusType,
  [DAY]: isDayStatusType,
  [SET]: isSetStatusType,
};

const isStatusType = R.curry((type, unit, period) =>
  R.ifElse(
    R.always(R.prop(unit, periods)),
    R.prop(unit, periods)(type),
    R.identity,
  )(period),
);

const isCompleted = isStatusType('completed');
const isSkipped = isStatusType('skipped');

export {isCompleted, isSkipped};
