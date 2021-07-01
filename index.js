const brain = require('brain.js');
const scaler = require('minmaxscaler')
const axios = require('axios')
const network = new brain.NeuralNetwork();


function TrainnigItem(input, output) {
    return {
        input,
        output
    }
}

function getData() {
    axios.get("https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?apikey=e80ccd292e4265b5ae8afe38cec18713")
    .then(res => res.data)
    .then(data => {
        const scaledPrices = scaler.fit_transform(Object.values(data['historical']).map(obj => Number(obj['close']))).slice(0, 100).reverse()
        const trainingData = []
        
        for(let i = 0; i < scaledPrices.length - 35; i++) {
            trainingData.push(TrainnigItem(scaledPrices.slice(i, i+30), scaledPrices.slice(i+30, i+35)))
        }
        network.train(trainingData, {
            learningRate: 0.005,
            errorThresh: 0.01
        })

        const arrLength = scaledPrices.length
        const scaledPricesMiness = scaledPrices.slice(arrLength-40, arrLength-5)
        const output = network.run(scaledPricesMiness);
        console.log(scaler.inverse_transform(scaledPrices.slice(arrLength-5)))
        console.log(scaler.inverse_transform(output))
    }).catch(err => console.log(err))
}

getData()