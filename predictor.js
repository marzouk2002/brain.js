const brain = require('brain.js')
const scaler = require('minmaxscaler')
const net = new brain.recurrent.LSTMTimeStep({
    inputSize: 1,
    hiddenLayers: [3, 3],
    outputSize: 1
});

function predictor(data) {
    const trainingData = format(scaler.fit_transform(data))

    net.train(trainingData, {
        learningRate: 0.005,
        errorThresh: 0.02,
    })

    return net.forecast(trainingData[trainingData.length - 1], 10)
}

function format(arr) {
    const toReturn = []
    for(let i= 0; i<scaledPrices.length; i+=5) {
        toReturn.push(scaledPrices.slice(i, i+5))
    }
    return toReturn
}