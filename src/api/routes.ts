import { PingFacotry } from '@/config/factories/ping-factory';
import { Router } from 'express';

export const apiRoutes = Router();

apiRoutes.get('/ping', PingFacotry.pingController.ping);
