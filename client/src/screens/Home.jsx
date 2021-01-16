import axios from 'axios';
import React, { useEffect, useState } from 'react';
import OperationsComponent from '../components/OperationsComponent';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import './styles.css';

export default function Home() {
    const [operations, setOperations] = useState();

    async function findOperations() {
        const response = await axios.get('http://localhost:3001/operations')
        setOperations(response.data)
    }

    useEffect(() => {
        findOperations()
    },[])

    var amounts = 0
    operations && operations.map(o => {
        if(o.type === "Egreso") {
            if(amounts === 0) {
                return amounts;
            }
            if(amounts < o.amount) {
                throw new Error('No tienes monto suficiente');
            }
            return amounts = amounts - o.amount;
        }
        if(o.type === "Ingreso") {
            amounts += o.amount
        }
    })

    const opArr = []
    operations && operations.map((o, i) => {
        opArr.push(o)
    })
    var sortOp = opArr.sort((a, b) => {
        if(a.id < b.id) {
            return 1;
        }
        if(a.id > b.id) {
            return -1;
        }
        return 0;
    })

    return (
        <div className="containerDetails">
            <div style={{height: "300px", width: "100%", zIndex: "-1", backgroundColor: "#7588ee", position: "absolute"}}></div>
            <div>
                <div>
                    <h1 style={{fontSize: "39px", color: "white", fontWeight: "bold"}}>Monto Disponible:</h1>
                </div>
                <div className="amount">
                    ${amounts}
                </div>
            </div>
            <div className="details">
                <div>
                    Concepto
                </div>
                <div>
                    Fecha
                </div>
                <div>
                    Tipo
                </div>
                <div>
                    Monto
                </div>
            </div>
            <div className="operationContainer">
                {
                    sortOp.map((o, i) => {
                        if(i === 10) {
                            return;
                        }
                        return (
                            <div key={i} onClick={() => console.log('Click')} style={{cursor: "pointer"}}>
                                <Link to={`/movement/${o.id}`} style={{color: "black", textDecoration: "none"}}>
                                    <OperationsComponent data={o} />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
            {
                sortOp.length >= 10 && 
                <div style={{margin: "30px"}}>
                    <Button variant="contained" color="primary">
                        <Link to='/movements' style={{textDecoration: "none", color: "white"}}>
                            Ver todos los movimientos
                        </Link>
                    </Button>
                </div>
            }
        </div>
    )
}