const brain = require('brain.js')
const scaler = require('minmaxscaler')
const trainingData = require('./stockData.json').map(obj => obj["close"])
const net = new brain.recurrent.LSTMTimeStep({
    inputSize: 1,
    hiddenLayers: [3, 2],
    outputSize: 1
});

function predictor(data) {
    const trainingData = format(scaler.fit_transform(data))

    const stats = net.train(trainingData, {
        learningRate: 0.005,
        errorThresh: 0.015,
    })
    console.log(stats)

    console.log(scaler.inverse_transform(trainingData[trainingData.length - 1]))
    return scaler.inverse_transform(net.forecast(trainingData[trainingData.length - 2], 5))
}

function format(arr) {
    const toReturn = []
    for(let i= 0; i<arr.length; i+=5) {
        toReturn.push(arr.slice(i, i+5))
    }
    return toReturn
}

console.log(predictor(trainingData))