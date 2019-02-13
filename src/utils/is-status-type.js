import * as R from 'ramda';
import {PERFORMED, SKIPPED} from '../state/ducks/cycles/constants';

export const CYCLE = 'CYCLE';
export const WEEK = 'WEEK';
export const DAY = 'DAY';
export const SET = 'SET';

const isSetStatusType = types =>
  R.pipe(
    R.propOr({}, 'status'),
    R.propOr('', 'type'),
    R.includes(R.__, types),
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

const isPerformed = isStatusType([PERFORMED]);
const isSkipped = isStatusType([SKIPPED]);
const isDone = isStatusType([PERFORMED, SKIPPED]);

export {isPerformed, isSkipped, isDone};
