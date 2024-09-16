const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static form (HTML file)
app.use(express.static('public'));

// Route to handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create a Nodemailer transporter using Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'toateeb09@gmail.com', // your Gmail address
            pass: 'ate__ira0', // your Gmail password or app-specific password
        },
    });

    // Email content
    const mailOptions = {
        from: email, // sender email
        to: 'toateeb09@gmail.com', // your Gmail address
        subject: 'New Form Submission',
        text: `You have a new message from ${name} (${email}):\n\n${message}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email: ' + error.message);
        }
        res.send('Email sent successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${3000}`);
});
