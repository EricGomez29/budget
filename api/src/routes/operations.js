const server = require('express').Router();
const { Operations } = require('../db.js');
const moment = require('moment')

server.get('/', (req, res) => {
    Operations.findAll().then(op => res.json(op));
})

server.post('/new', (req, res) =>{
    const date = moment().format('DD/MM/YYYY');
    const {concept, description, amount, type } = req.body;
    Operations.create({
        concept,
        description,
        amount,
        type,
        date
    }).then(op => res.status(200).json(op))
}) 


module.exports = server;