import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Basic CORS setup
app.use(cors());

// Basic health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV });
});

// Basic test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Test server is running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV);
});
