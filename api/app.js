// const express = require( 'express' );

// const app = express();
// const bodyParser = require('body-parser');
// const patientRoute = require('./routes/patient');
// const doctorRoute = require('./routes/doctor');
// const imageRoute = require('./routes/images');
// const medicineRoute = require('./routes/medicine');
// const appointmentRoute = require('./routes/appointment');
// const diagnosisReportRoute = require('./routes/diagnosisreport');
// const stripeRoute = require('./routes/stripe.payment');

// const cors = require('cors');

// app.use(cors({
//     origin:'*',
//     methods:['POST','GET'],
//     credentials: true  // Enable credentials (cookies, HTTP authentication) for cross-origin requests

// }))
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

// app.use('/patient',patientRoute);
// app.use('/uploads', express.static('uploads'));
// app.use('/doctor',doctorRoute);
// app.use('/image',imageRoute);
// app.use('/medicine',medicineRoute);
// app.use('/appointment',appointmentRoute);
// app.use('/diagnosisreport',diagnosisReportRoute)
// app.use('/payment',stripeRoute);


// module.exports = app;




const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const patientRoute = require('./routes/patient');
const doctorRoute = require('./routes/doctor');
const imageRoute = require('./routes/images');
const medicineRoute = require('./routes/medicine');
const appointmentRoute = require('./routes/appointment');
const diagnosisReportRoute = require('./routes/diagnosisreport');
const stripeRoute = require('./routes/stripe.payment');
const cors = require('cors');

app.use(cors({
    origin: '*',
    methods: ['POST', 'GET','PATCH','PUT','DELETE'],
    credentials: true  // Enable credentials (cookies, HTTP authentication) for cross-origin requests
}));

 app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/patient', patientRoute);
app.use('/uploads', express.static('uploads'));
app.use('/doctor', doctorRoute);
app.use('/image', imageRoute);
app.use('/medicine', medicineRoute);
app.use('/appointment', appointmentRoute);
app.use('/diagnosisreport', diagnosisReportRoute);
app.use('/payment', stripeRoute);

module.exports = app;
