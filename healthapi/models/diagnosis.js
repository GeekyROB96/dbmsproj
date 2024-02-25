'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Diagnosis extends Model {
    static associate(models) {
      Diagnosis.belongsTo(models.Appointment, {
        foreignKey: 'appointmentId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Diagnosis.init({
    appointmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Appointment', // This should be the name of the referenced model
        key: 'id', // This should be the name of the referenced column in the Appointment model
      },
    },
    doctorName: {
      type: DataTypes.STRING,
    },
    diagnosedFor: {
      type: DataTypes.STRING,
    },
    diagnosisDate: {
      type: DataTypes.DATE,
    },
    reason: {
      type: DataTypes.STRING,
    },
    measures: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Diagnosis',
  });

  return Diagnosis;
};
