const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    // Generate dummy data for high-tariff and solar energy
    const highTariffPeriods = [
        '2:00 PM - 4:00 PM',
        '6:00 PM - 8:00 PM',
    ];
    const solarEnergySellingOpportunity = 'Between 10:00 AM - 12:00 PM';

    // Construct the message using dummy data
    const message = `
        Tariff Alerts:
        Inform users about upcoming high-tariff periods.
        Upcoming High-Tariff Periods: ${highTariffPeriods.join(', ')}
        Try to reduce usage during these periods to minimize costs.

        Optimal Time to Sell Excess Solar Energy: ${solarEnergySellingOpportunity}
    `;

    const { recipients, subject } = req.body;

    // Create a transporter using your email service credentials
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Replace with your Gmail
            pass: 'your-email-password'   // Replace with your Gmail app password
        }
    });

    // Setup email data
    let mailOptions = {
        from: '"Energy Management System" <your-email@gmail.com>', // Replace with your email
        to: recipients.join(', '),
        subject: subject,
        text: message
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send({ success: false, error: 'Failed to send email' });
        }
        console.log('Email sent: ' + info.response);
        res.send({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
