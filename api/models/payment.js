// Payment model file

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      // Define association with Patient model
      Payment.belongsTo(models.Patient, {
        foreignKey: 'PatientId',
        onDelete: 'CASCADE', // Adjust based on your requirements
        onUpdate: 'CASCADE', // Adjust based on your requirements
      });
    }
  }

  Payment.init({
    TransactionId: DataTypes.STRING,
    PatientId: DataTypes.INTEGER,
    PaymentMethod: DataTypes.STRING,
    DateTime: DataTypes.DATE,
    PayerName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Payment',
  });

  return Payment;
};
