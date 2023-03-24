import { Router } from "express";
import { TodoController } from "./Controllers/TodoController";

require('dotenv').config()
const routes = Router();

const todoController = new TodoController
routes.get('/todo',todoController.GetTasks)
routes.get('/todo/:id',todoController.GetTask)
routes.post('/todo',todoController.Insert)
routes.delete('/todo/:id',todoController.Delete)
routes.put('/todo/:id',todoController.Update)
routes.put('/todo/:id/finish',todoController.FinishTask)

export { routes }
