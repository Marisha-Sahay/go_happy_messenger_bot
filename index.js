'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        let sender = event.sender.id
        // if (event.message && event.message.text) {
        //     let text = event.message.text
        //     sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
        // }
        if (event.message && (if(event.message.text == "Hi" || event.message.text == "Hello"))) {
            sendTextMessage(sender,"Hello, Welcome to GoHappy babysitters. So are you a babysitter or parent?")
        }} if (event.message && (if(event.message.text == "babysitter" || event.message.text == "Babysitter"))) {
            sendTextMessage(sender,"We have many parents enrolled to our site. Join us on www.gohappybabysitters.com")
        }} if (event.message && (if(event.message.text == "parent" || event.message.text == "Parent"))) {
            sendTextMessage(sender,"We have many babysitters. Join our site to post jobs or chat with babysitters in San Francisco directly.")
        }} if (event.message && (if(event.message.text == "bye") {
            sendTextMessage(sender,"Hope to see you soon. Have a good day."))
        }}
    }
    res.sendStatus(200)
})

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

const token = "EAAPz3YKnxY4BAFFL7ZAg9sh0oZCZBZBG7XmVdjjIOra9bfdmY9wiLN9WKhknIvHvZCtprvE1lW8FiYwcdKpbLVQSrmJLk3DT9yZBbgZAmUSOPUJeHcNZCEWAZCiD5GSI2qq0KZB3kbNP287aXZBsqX4210q52u2d1dTZC5mYDlE9q16BDQZDZD"