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

server.post('/new', async (req, res) =>{
    const date = moment().format('DD/MM/YYYY');
    const {concept, description, amount, type } = req.body;
    var totalAmount = 0
    try {
        var ops = await Operations.findAll()
        if(!concept || !amount || !type) {
            return res.json([{message: "Por favor rellena los campos correctamente"}]).status(400)
        }
        if(ops.length !== 0)  {
            ops.map(op => {
                if(op.type === "Egreso"){
                    if(totalAmount < op.amount){
                        return res.json({message: "No tienes salgo suficiente"})
                    }
                    totalAmount = totalAmount - op.amount
                }
                if(op.type === "Ingreso"){
                    totalAmount += op.amount
                }
                return;
            })
        }
        if(type === "Egreso"){
            if(totalAmount <= 0) {
                return res.json([{message: "No tienes monto, por lo tanto no puedes realizar egresos"}]).status(200)
            }
            if(totalAmount < amount) {
                return res.json({message: "No tienes monto suficiente"})
            }
            var newOpExit = await Operations.create({
                concept,
                description,
                amount,
                type,
                date
            })
            totalAmount = totalAmount - newOpExit.amount
            return res.json([{message: "Monto descontado y operacion realizada con exito"}, {amount: totalAmount}, newOpExit])
        }
        var newOpEntry = await Operations.create({
            concept,
            description,
            amount,
            type,
            date
        })
        totalAmount += newOpEntry.amount
        res.send([{message:"Operacion realizada con exito"}, {amount: totalAmount}, newOpEntry]).status(200)
    } catch (e) {
        res.json([{message: "Error interno"}]).status(404)
    }
});

server.put('/modify/:id', (req, res) => {
    const id = req.params.id
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
        res.status(400).send('Error')
        console.log('Error: ', err)
    })
    
})


module.exports = server;