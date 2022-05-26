const express = require('express')
const bodyParser = require('body-parser')

const promoRouter = express.Router()

// API For promotions
promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    next()
})
.get((req, res, next) => {
    res.end('will send all promos to you')
})
.post((req, res, next) => {
    res.end(`Will add the promos : ${req.body.name} with details ${req.body.description}`)
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported in /promos')
})
.delete((req, res, next) => {
    res.statusCode = 403
    res.end('Deleting all promos')
})


// API for promotions/promoId
promoRouter.route('/:promoId')
.get((req, res) => {
    res.end(`will send promo to you that promoId : ${req.params.promoId}`)
})
.post((req, res) => {
    res.statusCode = 403
    res.end(`Post cannot work on /promos/${req.params.promoId}`)
})
.put((req, res) => {
    res.write(`promos with id : ${req.params.promoId} updated \n`)
    res.end(`promos update with name : ${req.body.name} and description : ${req.body.description}`)
})
.delete((req, res) => {
    res.end(`promos with id : ${req.params.promoId} was updated`)
})

module.exports = promoRouter; 