const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen:{
      type: DataTypes.STRING,
      allowNull: false
    },
    altura:{
      type: DataTypes.STRING,
      allowNull: false
    },
    peso:{
      type: DataTypes.STRING,
      allowNull: false
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    timestamps: false
  }
  );
};
