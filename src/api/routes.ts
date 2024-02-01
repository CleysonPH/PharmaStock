import { Router } from 'express';
import { MedicineController } from './controllers/medicine-controller';
import { PingController } from './controllers/ping-controller';

export const apiRoutes = Router();

apiRoutes.get('/ping', PingController.ping);

apiRoutes.post('/medicines', MedicineController.create);
apiRoutes.put('/medicines/:id', MedicineController.update);
