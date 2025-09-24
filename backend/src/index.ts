import express from 'express';
import { injectTraceId } from './middleware/trace';
import { logger } from './utils/logger';
import { initializeFirebase } from './config/firebase';

import authRoutes from './routes/authRoutes'; // Import auth routes

// Initialize Firebase Admin SDK
initializeFirebase();

const app = express();
app.use(express.json());
app.use(injectTraceId);

// Register routes
app.use('/auth', authRoutes);

app.get('/health', (req, res) => {
  const traceId = (req as any).traceId;
  logger.info('health_check', { traceId });
  res.json({ ok: true, traceId });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => logger.info(`backend_started`, { port: PORT }));