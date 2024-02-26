  'use strict';
  const { Model } = require('sequelize');

  module.exports = (sequelize, DataTypes) => {
    class Appointment extends Model {
      static associate(models) {
        // Define association with Patient model
        Appointment.belongsTo(models.Patient, {
          foreignKey: 'PatientId',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        });
      }
    }

    Appointment.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      AppointmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PatientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      AppointmentDate: {
        type: DataTypes.DATE,
      },
      Symptoms: {
        type: DataTypes.STRING,
      },
      AppointmentTime: {
        type: DataTypes.TIME,
      },
      Remarks: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Appointment',
    });

    return Appointment;
  };
