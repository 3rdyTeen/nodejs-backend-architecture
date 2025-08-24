import { type Application } from 'express';
import { list, register } from '../modules/user/user-controller.js';
import validate  from '../middlewares/validate-request.js';
import { createUserSchema } from '../modules/user/user-schema.js';

const route = '/api/user';
export default function (app: Application): void {
  // Acess : Public
  // GET : /api/users
  app.get(`${route}/`, list);

  // Acess : Public
  // POST : /api/users/register
  app.post(`${route}/register`, validate(createUserSchema), register);

//   // Acess : Public
//   // GET : /api/users/{id}
  // app.get(`${route}/:id`, getUser);

//   // Acess : Public
//   // POST : /api/users
//   // Params body : ...data
  // app.post(`${route}`, createUser);

//   // Acess : Public
//   // PUT : /api/users/{id}
//   // Params body : ...data
  // app.put(`${route}/:id`, updateUser);

//   // Acess : Public
//   // DELETE : /api/users/{id}
  // app.delete(`${route}/:id`, deleteUser);
}