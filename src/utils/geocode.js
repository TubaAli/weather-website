const request = require('request');

// https://docs.mapbox.com/api/search/#geocoding

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidHViYWFhYSIsImEiOiJja2VnMmk3dmgwczBkMnhwb3Uzd3F3cWxnIn0.R4MmAAt1QtX4tTxpDFMwIg&limit=1'
    request({ url, json: true }, (error, response) => {
        if(error){
            callback('Unable to connect to internet', undefined)
        } else if(response.body.features.length === 0){
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode