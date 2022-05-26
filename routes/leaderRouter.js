const express = require('express')
const bodyParser = require('body-parser')

const leaderRouter = express.Router()

// API For leader
leaderRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    next()
})
.get((req, res, next) => {
    res.end('will send all leaders to you')
})
.post((req, res, next) => {
    res.end(`Will add the leaders : ${req.body.name} with details ${req.body.description}`)
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported in /leaders')
})
.delete((req, res, next) => {
    res.statusCode = 403
    res.end('Deleting all leaders')
})


// API for leaders/leaderId
leaderRouter.route('/:leaderId')
.get((req, res) => {
    res.end(`will send leader to you that leaderId : ${req.params.leaderId}`)
})
.post((req, res) => {
    res.statusCode = 403
    res.end(`Post cannot work on /leaders/${req.params.leaderId}`)
})
.put((req, res) => {
    res.write(`leaders with id : ${req.params.leaderId} updated \n`)
    res.end(`leaders update with name : ${req.body.name} and description : ${req.body.description}`)
})
.delete((req, res) => {
    res.end(`leaders with id : ${req.params.leaderId} was updated`)
})

module.exports = leaderRouter; 