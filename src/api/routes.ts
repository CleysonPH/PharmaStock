import { Router } from 'express';
import { AuthController } from './controllers/auth-controller';
import { MedicineController } from './controllers/medicine-controller';
import { PingController } from './controllers/ping-controller';
import { StockMovementController } from './controllers/stock-movement-controller';
import { isAuthenticated } from './middlewares';

export const apiRoutes = Router();

apiRoutes.get('/ping', PingController.ping);

apiRoutes.get('/medicines', isAuthenticated, MedicineController.stockInquiry);
apiRoutes.post('/medicines', isAuthenticated, MedicineController.create);
apiRoutes.put('/medicines/:id', isAuthenticated, MedicineController.update);

apiRoutes.post(
  '/stock-movements', isAuthenticated, StockMovementController.create
);
apiRoutes.get(
  '/stock-movements/report', isAuthenticated, StockMovementController.report
);

apiRoutes.post('/auth/login', AuthController.login);
