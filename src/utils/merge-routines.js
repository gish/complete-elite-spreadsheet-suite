const R = require('ramda');

const getNumber = prop =>
  R.pipe(
    R.prop(prop),
    R.defaultTo([]),
    R.map(w => w.number),
  );

const diff = (a, b) => a - b;

const mergeUniqueSorted = R.pipe(
  R.flatten,
  R.uniq,
  R.sort(diff),
);

const uniqueNumbers = prop =>
  R.pipe(
    R.map(getNumber(prop)),
    mergeUniqueSorted,
  );

const daysByWeekNumberAndRoutine = weekNumber =>
  R.pipe(
    R.prop('weeks'),
    R.find(w => w.number === weekNumber),
    getNumber('days'),
  );

const findNumberedTime = number => entity =>
  R.defaultTo({})(
    R.find(
      R.pipe(
        R.prop('number'),
        R.equals(number),
      ),
    )(entity),
  );

const exerciseByWeekNumberAndDayNumberAndRoutine = weekNumber => dayNumber =>
  R.pipe(
    R.propOr([], 'weeks'),
    findNumberedTime(weekNumber),
    R.propOr([], 'days'),
    findNumberedTime(dayNumber),
    R.propOr([], 'exercises'),
  );

const mergeDaysByWeekNumberAndDayNumberAndRoutines = weekNumber => dayNumber =>
  R.pipe(
    R.map(exerciseByWeekNumberAndDayNumberAndRoutine(weekNumber)(dayNumber)),
    R.reduce(R.concat, []),
  );

const mergeWeeksByWeekNumberAndRoutines = weekNumber => routines =>
  R.pipe(
    R.map(daysByWeekNumberAndRoutine(weekNumber)),
    mergeUniqueSorted,
    R.map(dayNumber => ({
      number: dayNumber,
      exercises: mergeDaysByWeekNumberAndDayNumberAndRoutines(weekNumber)(
        dayNumber,
      )(routines),
    })),
  )(routines);

const uniqueWeeksByRoutines = R.pipe(
  R.map(
    R.pipe(
      R.prop('weeks'),
      R.map(R.prop('number')),
    ),
  ),
  mergeUniqueSorted,
);

const mergeRoutinesWeeks = routines =>
  R.pipe(
    uniqueWeeksByRoutines,
    R.map(weekNumber => ({
      number: weekNumber,
      days: mergeWeeksByWeekNumberAndRoutines(weekNumber)(routines),
    })),
  )(routines);

const mergeRoutinesExercises = R.pipe(
  R.map(R.defaultTo([], R.prop('exercises'))),
  R.reduce(R.concat, []),
  R.uniqWith(R.eqBy(R.prop('id'))),
);

const mergeRoutines = routines => ({
  exercises: mergeRoutinesExercises(routines),
  weeks: mergeRoutinesWeeks(routines),
});

export default mergeRoutines;