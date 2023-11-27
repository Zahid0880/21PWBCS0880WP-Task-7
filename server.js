const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 3000;

// Set up a route to serve the HTML page at /emails
app.get('/emails', async (req, res) => {
  try {
    // Read the contents of emails.txt
    const content = await fs.readFile('emails.txt', 'utf-8');

    // Send HTML response with the contents of emails.txt
    res.send(`
      <html>
        <head>
          <title>Email Content</title>
        </head>
        <body>
          <h1>Email Content</h1>
          <p>${content}</p>
        </body>
      </html>
    `);
  } catch (error) {
    // Handle errors, e.g., if the file doesn't exist
    res.status(500).send(`Error: ${error.message}`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/emails`);
});











const express = require('express');
const fs = require('fs').promises;
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Set up a route to serve the HTML page at /emails
app.get('/emails', async (req, res) => {
  try {
    // Read the contents of emails.txt
    const content = await fs.readFile('emails.txt', 'utf-8');

    // Send HTML response with the contents of emails.txt and a "Send Email" button
    res.send(`
      <html>
        <head>
          <title>Email Content</title>
        </head>
        <body>
          <h1>Email Content</h1>
          <p>${content}</p>
          <button onclick="sendEmail()">Send Email</button>
          <div id="notification"></div>
          <script>
            async function sendEmail() {
              // Make an AJAX request to the server to send the email
              try {
                const response = await fetch('/send-email');
                const data = await response.json();
                document.getElementById('notification').innerText = data.message;
              } catch (error) {
                document.getElementById('notification').innerText = 'Error: ' + error.message;
              }
            }
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    // Handle errors, e.g., if the file doesn't exist
    res.status(500).send(`Error: ${error.message}`);
  }
});

// Set up a route to send the email
app.get('/send-email', async (req, res) => {
  try {
    // Read the contents of emails.txt
    const content = await fs.readFile('emails.txt', 'utf-8');

    // Send email
    await sendEmail(content);

    // Send a success message back to the client
    res.json({ message: 'Email sent successfully!' });
  } catch (error) {
    // Send an error message back to the client
    res.status(500).json({ message: 'Error sending email: ' + error.message });
  }
});

// Function to send email
async function sendEmail(content) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_email@gmail.com', // replace with your email
      pass: 'your_password', // replace with your password
    },
  });

  const mailOptions = {
    from: 'your_email@gmail.com', // replace with your email
    to: 'recipient_email@example.com', // replace with the recipient's email
    subject: 'Read data from the Text file',
    text: content,
  };

  await transporter.sendMail(mailOptions);
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/emails`);
});
