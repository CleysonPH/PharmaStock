import express from 'express';
import { apiRoutes } from './api/routes';

export const app = express();

app.use('/api', apiRoutes);
