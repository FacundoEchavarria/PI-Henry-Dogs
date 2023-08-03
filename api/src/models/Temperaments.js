const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('Temperament', {
        id:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        },
        nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
        },
    },
    {
      timestamps: false
    }
    );
};