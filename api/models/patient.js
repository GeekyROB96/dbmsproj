'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    static associate(models) {
      // define association here
    }
  }

  Patient.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      // Ensure PatientId is not null
    },
    PatientName: {
      type: DataTypes.STRING,
    },
    PatientEmail: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure PatientEmail is not null
    },
    PatientPassword: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure PatientPassword is not null
    },
    PatientDOB: {
      type: DataTypes.DATE,
    },
    Address: {
      type: DataTypes.STRING,
    },
    ContactNo: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Patient',
  });

  return Patient;
};
