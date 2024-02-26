'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Med extends Model {
    static associate(models) {
      // Define association with Appointment model
      Med.belongsTo(models.Appointment, {
        foreignKey: 'AppointmentId', // Foreign key in Med model
        targetKey: 'id', // Primary key in Appointment model
        onDelete: 'CASCADE',
      });
    }
  }

  Med.init({
    mediid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    MedName: DataTypes.STRING,
    Price: DataTypes.INTEGER,
    Manufacturer: DataTypes.STRING,
    Dosage: DataTypes.STRING,
    Duration: DataTypes.STRING,
    AppointmentId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Med',
  });

  return Med;
};
