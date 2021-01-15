import React from 'react';
import './styles.css';

export default function OperationsComponent(data) {
    const info = data.data

    return (
        <div className="operationsContainer">
            <div className="operations">
                <div>
                    {info.concept}
                </div>
                <div>
                    {info.date}
                </div>
                <div>
                    {info.type}
                </div>
                <div>
                    ${info.amount}
                </div>
            </div>
        </div>
    )
}
