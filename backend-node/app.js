const express = require('express');

const app = express();
const port = 3000;

const path = require('path');

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend-react/dist')));

// Catch-all to serve index.html for any unknown routes (like /dashboard, /inventory)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend-react/dist/index.html'));
});

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});