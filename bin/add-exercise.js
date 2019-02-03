const fs = require('fs');
const uuidv4 = require('uuid/v4');
const EXERCISES_FILENAME = __dirname + '/../src/assets/exercises.json';

const name = process.argv[2] || '';

if (name.length === 0) {
  console.error('Error: Missing exercise name');
  process.exit(1);
}
const id = uuidv4();
const exercise = {id, name};
const exercises = require(EXERCISES_FILENAME);
const updatedExercises = [...exercises, exercise];

fs.writeFileSync(EXERCISES_FILENAME, JSON.stringify(updatedExercises, null, 2));
