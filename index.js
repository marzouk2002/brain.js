const brain = require('brain.js');
const scaler = require('minmaxscaler')
const axios = require('axios')
const network = new brain.NeuralNetwork();

class TrainnigItem {
    constructor(input, output) {
        this.input = input;
        this.output = output;
    }
}

function getData() {
    axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=QFC9L0EG01AD6PH5&outputsize=compact")
    .then(res => res.data)
    .then(data => {
        const scaledPrices = scaler.fit_transform(Object.values(data['Time Series (5min)']).map(obj => Number(obj['4. close'])))
        const trainningData = []
        
        for(let i = 0; i < scaledPrices.length - 30; i++) {
            trainningData.push(new TrainnigItem(scaledPrices.slice(i, i+30), scaledPrices[i+30]))
        }
        network.train(trainningData)
    }).catch(err => console.log(err))
}


getData()