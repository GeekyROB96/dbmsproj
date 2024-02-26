'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Med extends Model {
    static associate(models) {
      // Define association with Appointment model
      Med.belongsTo(models.Appointment, { foreignKey: 'id',
    onDelete: 'CASCADE', });
    }
  }
  Med.init({
    mediid :{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true

    },
    MedName: DataTypes.STRING,
    Price: DataTypes.INTEGER,
    Manufacturer: DataTypes.STRING,
    Dosage: DataTypes.STRING,
    Duration: DataTypes.STRING,
    AppointmentId:{
      type: DataTypes.INTEGER,
      allowNull: false
    // Remove AppointmentId from here as it's already defined in the migration
  },
 }, {
    sequelize,
    modelName: 'Med',
    // Define options such as tableName if needed
  });
  return Med;
};