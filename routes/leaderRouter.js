const express = require('express')
const bodyParser = require('body-parser')

const Leaders = require('../models/leaders')

var authenticate = require('../authenticate')

const leaderRouter = express.Router()

// API For leader
leaderRouter.route('/')
.get((req, res, next) => {
    Leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(authenticate.verifyUser, (req, res, next) => {
    Leaders.create(req.body)
    .then((leader) => {
        console.log('Promotion Created', leader)
        res.statusCode = 200,
        res.setHeader('Content-Type', 'application/json');
        res.json(leader)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported in /leaders')
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
})


// API for leaders/leaderId
leaderRouter.route('/:leaderId')
.get((req, res) => {
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.json(leader)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403
    res.end(`Post cannot work on /leaders/${req.params.leaderId}`)
})
.put(authenticate.verifyUser, (req, res) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set : req.body
    }, { new : true})
    .then((leader) => {
        res.stausCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.json(leader)
    },(err) => next(err))
    .catch((err) => next(err))
})
.delete(authenticate.verifyUser, (req, res) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = leaderRouter; 