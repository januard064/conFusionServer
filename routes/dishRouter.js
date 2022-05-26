const express = require('express')
const bodyParser = require('body-parser')

const dishRouter = express.Router()

dishRouter.use(bodyParser.json())

// API for dishes
dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    next()
})
.get((req, res, next) => {
    res.end('will send all dishes to you')
})
.post((req, res, next) => {
    res.end(`Will add the dishes : ${req.body.name} with details ${req.body.description}`)
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported in /dishes')
})
.delete((req, res, next) => {
    res.end('Deleting all dishes')
})

// API for dishes/dishId
dishRouter.route('/:dishId')
.get((req, res, next) => {
    res.end(`will send the details of dish with id ${req.params.dishId}`)
})
.post((req, res, next) => {
    res.statusCode = 403
    res.end(`Post operation not supproting in /dishes/dishId on id: ${req.params.dishId}`)
})
.put((req, res, next) => {
    res.write(`will update the dish with id:${req.params.dishId}`)
    res.end(`will update the name to : ${req.body.name} with description :  ${req.body.description}`)
})
.delete((req, res, next) => {
    res.end(`will detele dish that id : ${req.params.dishId}`)
})

module.exports = dishRouter;