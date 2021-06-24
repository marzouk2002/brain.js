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
    axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=QFC9L0EG01AD6PH5&outputsize=compact")
    .then(res => res.data)
    .then(data => {
        const scaledPrices = scaler.fit_transform(Object.values(data['Time Series (5min)']).map(obj => Number(obj['4. close'])))
        const trainingData = []
        
        for(let i = 0; i < scaledPrices.length - 35; i++) {
            trainingData.push(TrainnigItem(scaledPrices.slice(i, i+30), scaledPrices.slice(i+30, i+35)))
        }
        network.train(trainingData)

        const scaledPricesMiness = scaledPrices.slice(64, 94)
        const output = network.run(scaledPricesMiness);
        console.log(scaler.inverse_transform(scaledPrices.slice(94)))
        console.log(scaler.inverse_transform(output))
    }).catch(err => console.log(err))
}

getData()