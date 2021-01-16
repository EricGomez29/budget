import React, { useState } from 'react';
import './styles.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: "25ch",
      textAlign: "left",
      color: "white"
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        }
    },
}));

export default function NewOperation() {
    const classes = useStyles();
    const [type, setType] = useState('');
    const [concept, setConcept] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    // const [state, setState] = useState({
    //     type: "",
    //     concept: "",
    //     amount: "",
    //     description: ""
    // })

    // const handleChange = (e) => {
    //     console.log(state)
    // };

    const handleClick = async () => {
        alert('Operacion exitosa')
    }

    const sendData = async (e) => {
        if(!concept) {
            return alert('Introduzca un concepto valido')
        }
        if(!amount || typeof parseInt(amount) !== 'number'){
            console.log(amount)
            return alert('Introduzca un monto valido')
        }
        await axios.post('http://localhost:3001/operations/new', {
            concept: concept,
            amount: amount,
            description: description,
            type: type
        })
        setConcept('')
        setAmount('')
        setDescription('')
        setType('')
        alert('Operacion creada con exito')
    }

    return (
        <div className="containerDetails2">
            <div style={{height: "300px", width: "100%", zIndex: "-1", backgroundColor: "#7588ee", position: "absolute", boxShadow: "1px 1px 12px -3px"}}></div>
            
            <div>
                <div>
                    <h1 style={{fontSize: "39px", color: "black", fontWeight: "bold"}}>Nueva Operación</h1>
                </div>
            </div>
            <div style={{width: "50%", backgroundColor: "#7588ee", borderRadius: "0px 0px 40px 40px", paddingBottom: "30px", boxShadow: "0px 14px 12px -14px"}}>
                <form className={classes.root} noValidate autoComplete="off" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <TextField id="standard-basic" label="Amount" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                    <TextField id="standard-basic" label="Concepto" name="concept" value={concept} onChange={(e) => setConcept(e.target.value)}/>
                    <TextField id="standard-basic" label="Descripcion" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <select name="type" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="">Seleccionar</option>
                        <option value="Ingreso" name="type" >Ingreso</option>
                        <option value="Egreso" name="type" >Egreso</option>
                    </select>
                    <Button variant="contained" color="primary" onClick={sendData}>
                        Ver todos los movimientos
                    </Button>
                </form>
            </div>
        </div>
    )
}