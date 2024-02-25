'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    static associate(models) {
      // define association here
    }
  }

  Doctor.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false, // Ensure DoctorId is not null
    },
    DoctorEmail: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure DoctorEmail is not null
    },
    DoctorPassword: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure DoctorPassword is not null
    },
    DoctorName: {
      type: DataTypes.STRING,
    },
    Availability: {
      type: DataTypes.STRING,
    },
    Specialization: {
      type: DataTypes.STRING,
    },
    ContactNo: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Doctor',
  });

  return Doctor;
};
