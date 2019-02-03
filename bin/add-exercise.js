const fs = require('fs');
const R = require('ramda');
const uuidv4 = require('uuid/v4');
const EXERCISES_FILENAME = __dirname + '/../src/assets/exercises.json';
const exercises = require(EXERCISES_FILENAME);

const name = process.argv[2] || '';
const id = uuidv4();
const exercise = {id, name};

if (name.length === 0) {
  console.error('Error: Missing exercise name');
  process.exit(1);
}

if (R.any(e => e.name === exercise.name, exercises)) {
  console.error('Error: Exercise already added');
  process.exit(2);
}

const updatedExercises = [...exercises, exercise];

fs.writeFileSync(EXERCISES_FILENAME, JSON.stringify(updatedExercises, null, 2));
