import React from 'react';
import { Link } from 'react-router-dom';
import OperationsComponent from '../components/OperationsComponent';

export default function Movements(data) {
    const operations = data.data;
    console.log(operations)

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
            <div style={{height: "300px", width: "100%", zIndex: "-1", backgroundColor: "#7588ee", position: "absolute"}}>
                
            </div>
            <div>
                <h1 style={{fontSize: "100px", color: "white"}}>Movimientos</h1>
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
        </div>
    )
}