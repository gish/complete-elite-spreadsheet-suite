const R = require('ramda');
const uuidv4 = require('uuid/v4');

const weekLens = () => {
  const path = ['weeks'];
  return R.lens(R.path(path), R.assocPath(path));
};

const assignIdsToWeek = cycle => {
  const weeksWithIds = R.pipe(
    R.view(weekLens()),
    R.defaultTo([]),
    R.map(R.assoc('id', uuidv4())),
  )(cycle);
  return R.set(weekLens(), weeksWithIds, cycle);
};

const assignIdsToDays = cycle => {
  const assign = (weeks, week) =>
    R.append(
      R.assoc(
        'days',
        R.pipe(
          R.prop('days'),
          R.map(R.assoc('id', uuidv4())),
        )(week),
        week,
      ),
      weeks,
    );
  const weeksWithDaysWithIds = R.pipe(
    R.view(weekLens()),
    R.defaultTo([]),
    R.reduce(assign, []),
  )(cycle);
  return R.set(weekLens(), weeksWithDaysWithIds, cycle);
};

const assigner = {
  week: assignIdsToWeek,
  day: assignIdsToDays,
};
const assignIdsTo = (cycle, unit) =>
  R.defaultTo(R.identity, R.prop(unit, assigner))(cycle);

const assignIds = cycle => R.reduce(assignIdsTo, cycle, ['day', 'week']);

export default assignIds;
