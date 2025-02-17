const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Set Content Security Policy headers to allow everything
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src *; script-src * 'unsafe-eval' 'unsafe-inline'; style-src * 'unsafe-inline'; img-src *; font-src *; connect-src *;");
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/logistics_networks', (req, res) => {
    const filePath = path.resolve(__dirname, '../../../../script-output/logistics_networks.json');
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('File not found');
        } else {
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    res.status(500).send('Error getting file stats');
                } else {
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            res.status(500).send('Error reading file');
                        } else {
                            const jsonData = JSON.parse(data);
                            jsonData.timestamp = stats.mtime.toLocaleTimeString();
                            res.json(jsonData);
                        }
                    });
                }
            });
        }
    });
});

// Handle all other routes by serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});