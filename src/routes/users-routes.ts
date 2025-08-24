import { type Application } from 'express';
import { deleteUser, getUser, list, updateUser } from '../modules/user/user-controller.js';
import { authMiddleware } from '../middlewares/auth-protect.js';
import validate from '../middlewares/validate-request.js';
import { updateUserSchema } from '../modules/user/user-schema.js';

export default function (app: Application): void {
  const route = '/api/users';

  // ---- Public routes ----


  // ---- Private routes (protected) ----

  // all routes after this line require auth
  app.use(route, authMiddleware);

  // Acess : Private
  // GET : /api/users
  app.get(`${route}/`, list);

  // Acess : Private
  // GET : /api/users/{id}
  app.get(`${route}/:id`, getUser);

  // Acess : PRIVATE
  // PUT : /api/users/{id}
  // Params body : ...data
  app.put(`${route}/:id`,  validate(updateUserSchema), updateUser);

  // Acess : Private
  // DELETE : /api/users/{id}
  app.delete(`${route}/:id`, deleteUser);
}