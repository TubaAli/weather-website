const request = require('request')

// https://weatherstack.com/quickstart

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=814601cfc30c28928b271b8617e9354f&query='+ latitude +','+ longitude +'&units=f'
    request({ url, json: true }, (error, response) => {
        if(error){
            callback('Unable to connect to the internet', undefined)
        } else if(response.body.error){
            callback('Unable to get correct coordinates', undefined)
        } else {
            callback(undefined, 'It is currently '+ response.body.current.temperature +' but it feels like '+ response.body.current.feelslike)
        }
    })
}

module.exports = forecast