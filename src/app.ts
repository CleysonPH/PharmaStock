import express from 'express';
import { apiRoutes } from './api/routes';

export const app = express();

app.use(express.json());

app.use('/api', apiRoutes);
app.use(express.static('public'));
