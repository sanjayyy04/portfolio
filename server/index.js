import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { fileURLToPath } from 'node:url';
import contactRouter from './routes/contact.js';

config({ path: fileURLToPath(new URL('./.env', import.meta.url)) });

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MONGODB_URI is missing. In the server folder, copy .env.example to .env and set your MongoDB Atlas connection string.');
  process.exit(1);
}
if (mongoUri.includes('<db_password>')) {
  console.error('MONGODB_URI still contains the <db_password> placeholder. Replace it in server/.env with your URL-encoded MongoDB Atlas database password.');
  process.exit(1);
}

const port = Number(process.env.PORT ?? 3001);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('PORT must be an integer between 1 and 65535.');
  process.exit(1);
}

const allowedOrigins = (process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (_req, res) => {
  const isReady = mongoose.connection.readyState === 1;
  return res.status(isReady ? 200 : 503).json({ status: isReady ? 'ok' : 'unavailable' });
});

app.use('/api/contact', contactRouter);

app.use((error, _req, res, _next) => {
  if (error.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Request body is too large.' });
  }
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Request body must be valid JSON.' });
  }

  console.error('Unhandled API error:', error);
  return res.status(500).json({ error: 'Unable to process your request right now.' });
});

async function start() {
  await mongoose.connect(mongoUri, { dbName: 'portfolio' });
  const collectionExists = await mongoose.connection.db
    .listCollections({ name: 'portfolio_contact_form' }, { nameOnly: true })
    .hasNext();
  if (!collectionExists) {
    await mongoose.connection.db.createCollection('portfolio_contact_form');
  }
  app.listen(port, () => {
    console.info(`Contact API listening on port ${port}.`);
  });
}

start().catch(error => {
  console.error('Unable to connect to MongoDB or start the API:', error);
  process.exitCode = 1;
});
