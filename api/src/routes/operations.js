const server = require('express').Router();
const { Operations } = require('../db.js');
const moment = require('moment');

server.get('/', (req, res) => {
    Operations.findAll().then(op => res.json(op));
})

server.get('/:id', (req, res) => {
    const { id } = req.params

    Operations.findOne({
        where: {
            id: id
        }
    }).then(op => {
        if(!op) {
            return res.send('La operacion no existe').status(400)
        }
        res.status(200).json(op)
    }).catch(err => {
        res.send('Error interno').status(404)
        console.log('Error: ', err)
    })
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

server.put('/modify/:id', (req, res) => {
    const id = req.query.id
    const {concept, description, amount } = req.body;
    Operations.update({
        concept,
        description,
        amount
    }, {
        returning: true,
        where: {
            id: id,
        }
    }).then(op => {
        if (op[0] == 0) {
            res.status(400).send('Error, campos requeridos')
            return user[0]
        }
        res.status(200).json(op)
    }).catch(err => {
        res.status(400)
        console.log('Error: ', err)
    })
    
})


module.exports = server;