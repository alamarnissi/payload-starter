import express from 'express';
import payload from 'payload';
import { resetDatabase } from './cron/resetDatabase';
import { resetDbJob } from './cron/jobs';

require('dotenv').config();
const app = express();

// Initialize Payload
payload.init({
  secret: process.env.PAYLOAD_SECRET_KEY,
  mongoURL: process.env.MONGO_URL,
  express: app,
  onInit: async () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    await resetDatabase(); // Reset on start
  },
});

// Cron jobs
resetDbJob.start();

app.listen(3000);
