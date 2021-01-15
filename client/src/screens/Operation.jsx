import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';
import './styles.css';

export default function Operation({ id }) {
    const [operation, setOperation] = useState();
    
    useEffect(async () => {
        const response = await axios.get(`http://localhost:3001/operations/${id.id}`)
        setOperation(response.data)
    }, []);

    return (
        <div className="containerDetails">
            <div style={{height: "300px", width: "100%", zIndex: "-1", backgroundColor: "#7588ee", position: "absolute"}}></div>
            <div className="operationDetails">
                    <div>
                        {
                            operation && operation.type === "Egreso" && <h1 style={{fontSize: "39px", color: "white", fontWeight: "bold"}}>Egreso Por:</h1>
                        }
                        {
                            operation && operation.type === "Ingreso" && <h1 style={{fontSize: "39px", color: "white", fontWeight: "bold"}}>Ingreso Por:</h1>
                        }
                    </div>
                    <div className="amount">
                        ${operation && operation.amount}
                    </div>
            </div>
            <div className="bgContainer">
                <div className="containerDescription">
                    <div style={{display: "flex", flexDirection: "column",minWidth: "135px", maxWidth: "240px", alignItems: "center"}}>
                    </div>
                    <div className="information">
                        <div>
                            ID de operación
                        </div>
                    </div>
                    <div className="description">
                        <div>{operation && operation.id}</div>
                    </div>
                </div>
                <div className="containerDescription">
                    <div style={{display: "flex", flexDirection: "column",minWidth: "135px", maxWidth: "240px", alignItems: "center"}}>
                    </div>
                    <div className="information">
                        <div>
                            Descripción
                        </div>
                    </div>
                    <div className="description">
                        <div>{operation && operation.description}</div>
                    </div>
                </div>
                <div className="containerDescription">
                    <div style={{display: "flex", flexDirection: "column",minWidth: "135px", maxWidth: "240px", alignItems: "center"}}>
                    </div>
                    <div className="information">
                        <div>
                            Concepto
                        </div>
                    </div>
                    <div className="description">
                        <div>{operation && operation.concept}</div>
                    </div>
                </div>
                <div className="containerDescription">
                    <div style={{display: "flex", flexDirection: "column",minWidth: "135px", maxWidth: "240px", alignItems: "center"}}>
                    </div>
                    <div className="information">
                        <div>
                            Fecha
                        </div>
                    </div>
                    <div className="description">
                        <div>{operation && operation.date}</div>
                    </div>
                </div>
            </div>
            <div style={{width: "40%", marginTop: "20px", display: "flex", justifyContent: "space-around"}}>
                <Button variant="contained" color="primary">
                    <Link to='/movements' style={{textDecoration: "none", color: "white"}}>
                        Modificar
                    </Link>
                </Button>
                <Button variant="contained" color="secondary">
                    <Link to='/movements' style={{textDecoration: "none", color: "white"}}>
                        Eliminar
                    </Link>
                </Button>
            </div>
        </div>
    )
}