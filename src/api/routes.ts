import { Router } from 'express';
import { MedicineController } from './controllers/medicine-controller';
import { PingController } from './controllers/ping-controller';
import { StockMovementController } from './controllers/stock-movement-controller';

export const apiRoutes = Router();

apiRoutes.get('/ping', PingController.ping);

apiRoutes.post('/medicines', MedicineController.create);
apiRoutes.put('/medicines/:id', MedicineController.update);

apiRoutes.post('/stock-movements', StockMovementController.create);
