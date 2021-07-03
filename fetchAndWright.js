const axios = require("axios")
const fs = require('fs')

axios.get("https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?apikey=e80ccd292e4265b5ae8afe38cec18713")
.then(res => {
    return res.data['historical']
})
.then(arr => {
    fs.writeFile('fetchData.json', JSON.stringify(arr), function (err,data) {
        if (err) {
          return console.log(err);
        }
        console.log(data);
      })
})
.catch(err => console.log(err))