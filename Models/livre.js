const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Livre extends Model {}

Livre.init({
    _id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    genre: {
      type: DataTypes.STRING
    },
    auteur: {
      type: DataTypes.STRING
    },
    date_parution: {
      type: DataTypes.DATEONLY
    }  
  }, {
    sequelize: connection,
  });

module.exports = Livre;
