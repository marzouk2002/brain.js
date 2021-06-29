const brain = require('brain.js')
const scaler = require('minmaxscaler')
const axios = require('axios')
const net = new brain.recurrent.LSTMTimeStep({
    inputSize: 1,
    hiddenLayers: [3],
    outputSize: 1
});

function getData() {
    return axios.get("https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?apikey=e80ccd292e4265b5ae8afe38cec18713")
    .then(res => res.data)
    .then(data => {
        const scaledPrices = scaler.fit_transform(Object.values(data['historical']).map(obj => Number(obj['close']))).reverse()
        const trainingData = []
        
        while(scaledPrices.length ) {
            trainingData.push(scaledPrices.splice(0, 5))
        }
        
        return trainingData
    }).catch(err => console.log(err))
}

async function main() {
    const trainingData = await getData()
    const toPredict = trainingData.splice(trainingData.length - 1)
    const stats = net.train(trainingData, {
        learningRate: 0.005,
        errorThresh: 0.008,
    })
    // console.log(toPredict)
    console.log(stats)
    console.log(scaler.inverse_transform(net.forecast(trainingData[trainingData.length - 1], 3)))
    console.log(scaler.inverse_transform(toPredict[0]))
}

main()