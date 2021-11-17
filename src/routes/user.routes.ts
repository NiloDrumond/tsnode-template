import { createUserController } from '@/modules/user/useCases/createUser';
import { Router } from 'express';
const userRoutes = Router();

userRoutes.post('/', (request, response) => {
  return createUserController.handle(request, response);
});

export { userRoutes };
