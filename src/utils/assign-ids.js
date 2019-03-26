import * as R from 'ramda';
import uuidv4 from 'uuid/v4';

const weekLens = () => {
  const path = ['weeks'];
  return R.lens(R.path(path), R.assocPath(path));
};

const assignIdsToWeek = cycle =>
  R.pipe(
    R.view(weekLens()),
    R.defaultTo([]),
    R.map(x => R.assoc('id', uuidv4(), x)),
    weeks => R.set(weekLens(), weeks, cycle),
  )(cycle);

const assignIdsToDays = cycle => {
  const assign = (weeks, week) =>
    R.append(
      R.assoc(
        'days',
        R.pipe(
          R.prop('days'),
          R.map(x => R.assoc('id', uuidv4(), x)),
        )(week),
        week,
      ),
      weeks,
    );
  return R.pipe(
    R.view(weekLens()),
    R.defaultTo([]),
    R.reduce(assign, []),
    weeks => R.set(weekLens(), weeks, cycle),
  )(cycle);
};

const assignIdsTosets = cycle =>
  R.pipe(
    R.view(weekLens()),
    R.defaultTo([]),
    R.map(week =>
      R.assoc(
        'days',
        R.map(
          day =>
            R.assoc(
              'sets',
              R.pipe(
                R.prop('sets'),
                R.map(x => R.assoc('id', uuidv4(), x)),
              )(day),
            )(day),
          week.days,
        ),
        week,
      ),
    ),
    weeks => R.set(weekLens(), weeks, cycle),
  )(cycle);

const assigners = {
  week: assignIdsToWeek,
  day: assignIdsToDays,
  sets: assignIdsTosets,
};

const assignIdsTo = (cycle, unit) =>
  R.defaultTo(R.identity, R.prop(unit, assigners))(cycle);

const assignIds = cycle =>
  R.reduce(assignIdsTo, cycle, ['day', 'week', 'sets']);

export default assignIds;
