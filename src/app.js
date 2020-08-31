const path = require('path')  // core node modules are included before npm modules
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// defining paths for express config
const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Website',
        desc: 'This website will help you get weather forecast of different locations.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page!',
        desc: 'This is the about page bro! Here all are details about us exist!'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is the help page',
        desc: 'Here I am asking you if you need any help about this website'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            return res.send({
                location: location,
                forecastData: forecastData
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        error: 'This is my 404 page and the article you are searching for is not found'
    })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        error: 'This is my 404 page and It is not found!'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on '+ port)
})