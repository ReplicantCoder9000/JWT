
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

// Basic test endpoint
app.get('/', (_req, res) => {
  res.send('Hello from test server!');
});

app.get('/health', (_req, res) => {
  res.send('OK');
});

app.listen(PORT, () => {
  console.log(`Test server is running on port ${PORT}`);
  console.log('Environment variables:', {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT
  });
});
