import PropTypes from 'prop-types';
import React from 'react';
import propTypes from '../proptypes';

const mRound = (value, interval) => Math.round(value / interval) * interval;
const getWeight = (exercise, trainingMaxes, percentage) => {
  const trainingMax = trainingMaxes.find(
    trainingMax => trainingMax.id === exercise.id,
  );
  return trainingMax ? mRound((trainingMax.value * percentage) / 100, 2.5) : '';
};

const Plan = ({maxes, template}) => (
  <div>
    <h1>{template.name}</h1>
    {template.weeks.map(week => (
      <div>
        <h2>Week {week.number}</h2>
        {week.days.map(day => (
          <div>
            <h3>Day {day.number}</h3>
            <table>
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Sets</th>
                  <th>Reps</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                {day.exercises.map(exercise => {
                  const {
                    id,
                    name,
                    sets,
                    reps,
                    percentage,
                    amrap,
                    comments,
                  } = exercise;
                  const weight = getWeight(exercise, maxes, percentage);
                  const amrapSign = amrap ? '+' : '';
                  const prettyComments = comments
                    ? ' ' + comments.join(', ')
                    : '';
                  const setsCount = exercise.sets || 1;
                  return (
                    <tr>
                      <td>{id}</td>
                      <td>{setsCount}</td>
                      <td>
                        {reps}
                        {amrapSign}
                      </td>
                      <td>{weight}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    ))}
  </div>
);

Plan.propTypes = {
  maxes: propTypes.trainingMaxes.isRequired,
  template: propTypes.routine.isRequired,
};

export default Plan;
