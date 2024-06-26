import { Router } from 'express';
import { APIRedeSocialController } from '../controllers/apiredesocialController';

const apiRedeSocialRouter = Router();
const apiRedeSocialController = new APIRedeSocialController();

apiRedeSocialRouter.get('/apiredesocial', apiRedeSocialController.getAllAPIRedeSocial);
apiRedeSocialRouter.post('/api/:userId', apiRedeSocialController.storeUserData);
apiRedeSocialRouter.put('/apiredesocial/:id', apiRedeSocialController.updateAPIRedeSocial);
apiRedeSocialRouter.patch('/apiredesocial/:id', apiRedeSocialController.patchAPIRedeSocial);
apiRedeSocialRouter.delete('/apiredesocial/:id', apiRedeSocialController.deleteAPIRedeSocial);

export default apiRedeSocialRouter;
