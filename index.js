const brain = require('brain.js');
const scaler = require('minmaxscaler')

const network = new brain.NeuralNetwork();

// network.train([
//     { input: [1, 2], output: [1] }, // Team 2 wins
//     { input: [1, 3], output: [1] }, // Team 3 wins
//     { input: [2, 3], output: [0] }, // Team 2 wins
//     { input: [2, 4], output: [1] }, // Team 4 wins
//     { input: [1, 2], output: [0] }, // Team 1 wins
//     { input: [1, 3], output: [0] }, // Team 1 wins
//     { input: [3, 4], output: [0] } // Team 3 wins
// ]);
  
// const output = network.run([1, 4]);
  
// console.log(`Prob: ${output}`);

const data = scaler.fit_transform([0,1, 3, 5, 7, 10]);
const X_test = scaler.transform([1.5, 2.3]);
const X_test_inverse = scaler.inverse_transform([.6]);

console.log(data);
console.log(X_test);
console.log(X_test_inverse);
console.log(scaler.get_params());