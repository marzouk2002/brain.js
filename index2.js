const brain = require('brain.js')
const scaler = require('minmaxscaler')
const axios = require('axios')
const net = new brain.recurrent.LSTMTimeStep({
    inputSize: 1,
    hiddenLayers: [3, 3],
    outputSize: 1
});

function getData() {
    return axios.get("https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?apikey=e80ccd292e4265b5ae8afe38cec18713")
    .then(res => res.data)
    .then(data => {
        const scaledPrices = scaler.fit_transform(Object.values(data['historical']).map(obj => Number(obj['close']))).reverse()
        const trainingData = []
        
        for(let i= 0; i<scaledPrices.length-5; i+=5) {
            trainingData.push(scaledPrices.slice(i, i+5))
        }
        
        return trainingData
    }).catch(err => console.log(err))
}

async function main() {
    const trainingData = await getData()
    const stats = net.train(trainingData, {
        learningRate: 0.005,
        errorThresh: 0.02
    })
    console.log(stats)
    console.log(scaler.inverse_transform(trainingData[trainingData.length-2]))
    console.log(scaler.inverse_transform(net.forecast(trainingData[trainingData.length-2], 5)))
    console.log(scaler.inverse_transform(trainingData[trainingData.length-1]))
}

main()