const models = require('../models');
const Validator = require("fastest-validator");


function saveMedicine(req,res){

    const medicine = {

       
            MedName: req.body.MedName,
            ExpiryDate: new Date(req.body.ExpiryDate),
            Price: req.body.Price,
            Manufacturer: req.body.Manufacturer,
            Units: req.body.Units,
            PatientId: req.body.PatientId, // Assuming you receive PatientId in the request body
        };

        const schema = {
            MedName: { type: 'string', min: 3, max: 255 },
            ExpiryDate: { type: 'date' },
            Price: { type: 'number' },
            Manufacturer: { type: 'string', min: 3, max: 255 },
            Units: { type: 'number' },
            PatientId: { type: 'number' }, // Adjust the type as per your PatientId type
        };

        
    const v = new Validator();

    const validationResponse = v.validate(medicine, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation Failed",
            errors: validationResponse
        });
    }

    
    models.MedicineRecord.create(medicine)
        .then(result => {
            res.status(201).json({
                message: "Medicine Record Created Successfully!",
                medicine: result
            });
        })
        .catch(error => {
            console.error('Error Creating Medicine Record:', error.message);
            res.status(500).json({
                message: "Error Creating Medicine Record",
                error: error
            });
        });
}



function getMedicineRecordsByPatientId(req, res) {
    const patientId = req.params.patientId; // Assuming you pass patientId as a parameter
  
    models.Patient.findByPk(patientId)
      .then(patient => {
        if (!patient) {
          res.status(404).json({ message: 'Patient not found' });
          return;
        }
  
        // Find all medicine records associated with the patient
        return models.MedicineRecord.findAll({ where: { PatientId: patientId } });
      })
      .then(medicineRecords => {
        res.status(200).json(medicineRecords);
      })
      .catch(error => {
        console.error('Error getting medicine records:', error.message);
        res.status(500).json({ message: 'Something went wrong', error: error });
      });
  }


  function updateMedicine(req, res) {
    const medId = req.params.medId;
  
    // Fields that can be updated
    const updatedMedicine = {
      MedName: req.body.MedName,
      ExpiryDate: new Date(req.body.ExpiryDate),
      Price: req.body.Price,
      Manufacturer: req.body.Manufacturer,
      Units: req.body.Units,
     };
  
    const schema = {
      MedName: { type: 'string', min: 3, max: 255 },
      ExpiryDate: { type: 'date' },
      Price: { type: 'number' },
      Manufacturer: { type: 'string', min: 3, max: 255 },
      Units: { type: 'number' },
     };
  
    const v = new Validator();
    const validationResponse = v.validate(updatedMedicine, schema);
  
    if (validationResponse !== true) {
      return res.status(400).json({
        message: "Validation Failed",
        errors: validationResponse,
      });
    }
  
    // Find the medicine record by MedId
    models.MedicineRecord.findByPk(medId)
      .then((medicineRecord) => {
        if (!medicineRecord) {
          return res.status(404).json({
            message: "Medicine record not found",
          });
        }
  
        // Update the medicine record with new values
        return medicineRecord.update(updatedMedicine);
      })
      .then((updatedRecord) => {
        res.status(200).json({
          message: "Medicine record updated successfully!",
          medicineRecord: updatedRecord,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Uh Oh! Something Went Wrong!",
          error: error,
        });
      });
  }
  

  function deleteMedicine(req, res) {
    const medId = req.params.medId;
  
    // Find the medicine record by MedId
    models.MedicineRecord.findByPk(medId)
      .then((medicineRecord) => {
        if (!medicineRecord) {
          return res.status(404).json({
            message: "Medicine record not found",
          });
        }
  
        // Delete the medicine record
        return medicineRecord.destroy();
      })
      .then(() => {
        res.status(200).json({
          message: "Medicine record deleted successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Uh Oh! Something Went Wrong!",
          error: error,
        });
      });
  }

module.exports = {
    saveMedicine: saveMedicine,
    getMedicineRecordsByPatientId:getMedicineRecordsByPatientId,
    updateMedicine:updateMedicine,
    deleteMedicine:deleteMedicine
};


  
