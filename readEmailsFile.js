const fs = require('fs');

// Read the contents of the emails.txt file
fs.readFile('emails.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err.message);
  } else {
    console.log('Contents of emails.txt:');
    console.log(data);
  }
});
