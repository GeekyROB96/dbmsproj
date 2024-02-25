const models = require('../models');
const Validator = require("fastest-validator");
function createDiagnosisReport(req, res) {
    const diagnosisReport = {
        doctorName: req.body.doctorName,
        diagnosedFor: req.body.diagnosedFor,
        diagnosisDate: req.body.diagnosisDate,
        reason: req.body.reason,
        measures: req.body.measures,
        appointmentId: req.body.appointmentId, // Assuming appointmentId is passed in the URL
    };

    models.Diagnosis.create(diagnosisReport)
        .then(result => {
            res.status(201).json({
                message: "Diagnosis Report Created Successfully!",
                diagnosisReport: result
            });
        })
        .catch(error => {
            console.error('Error Creating Diagnosis Report:', error.message);
            res.status(500).json({
                message: "Error Creating Diagnosis Report",
                error: error
            });
        });
}
// function getDiagnosisReportsByPatientId(req, res) {
//     const patientId = req.params.patientId;

//     models.Diagnosis.findAll({
//         where: { PatientId: patientId },
//     })
//         .then((diagnosisReports) => {
//             res.status(200).json(diagnosisReports);
//         })
//         .catch((error) => {
//             console.error('Error getting diagnosis reports by PatientId:', error.message);
//             res.status(500).json({ message: 'Something went wrong', error: error });
//         });
// }

function getDiagnosiReportaid(req, res) {
    const appointmentId = req.params.appointmentId;

    models.Diagnosis.findAll({
        where: { appointmentId: appointmentId },
    })
        .then((diagnosisReports) => {
            res.status(200).json(diagnosisReports);
        })
        .catch((error) => {
            console.error('Error getting diagnosis reports by PatientId:', error.message);
            res.status(500).json({ message: 'Something went wrong', error: error });
        });
}
function deleteDiagnosisReport(req, res) {
    const id = req.params.id;

    models.DiagnosisReport.findByPk(id)
        .then((diagnosisReport) => {
            if (!diagnosisReport) {
                return res.status(404).json({
                    message: "Diagnosis report not found",
                });
            }

            // Delete the diagnosis report
            return diagnosisReport.destroy();
        })
        .then(() => {
            res.status(200).json({
                message: "Diagnosis report deleted successfully!",
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
    createDiagnosisReport: createDiagnosisReport,
   // getDiagnosisReportsByPatientId:getDiagnosisReportsByPatientId,
    deleteDiagnosisReport: deleteDiagnosisReport,
    getDiagnosiReportaid:getDiagnosiReportaid,

};
