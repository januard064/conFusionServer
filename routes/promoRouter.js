const express = require('express')
const bodyParser = require('body-parser')

const Promotions = require('../models/promotions')

const promoRouter = express.Router()

// API For promotions
promoRouter.route('/')
.get((req, res, next) => {
    Promotions.find({})
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req, res, next) => {
    Promotions.create(req.body)
    .then((promotion) => {
        console.log('Promotion Created', promotion)
        res.statusCode = 200,
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported in /promos')
})
.delete((req, res, next) => {
   Promotions.remove({})
   .then((resp) => {
       res.statusCode = 200
       res.setHeader('Content-Type', 'application/json');
       res.json(resp)
   }, (err) => next(err))
   .catch((err) => next(err))
})


// API for promotions/promoId
promoRouter.route('/:promoId')
.get((req, res) => {
    Promotions.findById(req.params.promoId)
    .then((promotion) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req, res) => {
    res.statusCode = 403
    res.end(`Post cannot work on /promos/${req.params.promoId}`)
})
.put((req, res) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set : req.body
    }, { new : true})
    .then((promotion) => {
        res.stausCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion)
    },(err) => next(err))
    .catch((err) => next(err))
})
.delete((req, res) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = promoRouter; 