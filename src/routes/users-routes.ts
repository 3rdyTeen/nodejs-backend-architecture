import { type Application } from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user-controller.js';

/** Controllers */


const route = '/api/users';
export default function (app: Application): void {
  // Acess : Public
  // GET : /api/users
  app.get(`${route}`, getUsers);

//   // Acess : Public
//   // GET : /api/users/{id}
  app.get(`${route}/:id`, getUser);

//   // Acess : Public
//   // POST : /api/users
//   // Params body : ...data
  app.post(`${route}`, createUser);

//   // Acess : Public
//   // PUT : /api/users/{id}
//   // Params body : ...data
  app.put(`${route}/:id`, updateUser);

//   // Acess : Public
//   // DELETE : /api/users/{id}
  app.delete(`${route}/:id`, deleteUser);
}