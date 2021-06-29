const brain = require('brain.js')

const trainingData = [[1, 3, 2, 4, 3, 5], [5, 7, 6, 8, 7, 9]]

const net = new brain.recurrent.LSTMTimeStep()

console.log(net.train(trainingData, {
    errorThresh:0.005
}))

console.log(net.forecast([2, 1], 2))