const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// defino el modelo
module.exports = (sequelize, create) => {
    sequelize.define('operations', {
        concept: {
            type: DataTypes.STRING,
            validate: {
                notNull: {
                    msg: 'Indique el concepto de su operacion'
                }
            },
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: 'Sin Descripción'
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        date: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)};