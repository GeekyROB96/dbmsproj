// MedicineRecord model file

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MedicineRecord extends Model {
    static associate(models) {
      // Define association with Patient model
      MedicineRecord.belongsTo(models.Patient, {
        foreignKey: 'PatientId',
        onDelete: 'CASCADE', // Adjust based on your requirements
        onUpdate: 'CASCADE', // Adjust based on your requirements
      });
    }
  }

  MedicineRecord.init({
    MedName: DataTypes.STRING,
    ExpiryDate: DataTypes.DATE,
    Price: DataTypes.FLOAT,
    Manufacturer: DataTypes.STRING,
    Units: DataTypes.INTEGER,
    
    PatientId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'MedicineRecord',
  });

  return MedicineRecord;
};
