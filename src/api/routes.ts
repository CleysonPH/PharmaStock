import { Router } from 'express';

import { PingController } from './controllers/ping-controller';

export const apiRoutes = Router();

const pingController = new PingController();

apiRoutes.get('/ping', pingController.ping);
