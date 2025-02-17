const express = require('express');
const path = require('path');
const app = express();

// Set Content Security Policy headers to allow everything
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src *; script-src * 'unsafe-eval' 'unsafe-inline'; style-src * 'unsafe-inline'; img-src *; font-src *; connect-src *;");
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Handle all other routes by serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});