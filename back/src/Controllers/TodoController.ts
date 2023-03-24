import { randomUUID } from 'node:crypto';
import { Request, Response } from 'express'
import { TodoDAO } from '../DAO/TodoDAO';


class TodoController {

    async GetTasks(request: Request, response: Response) {
        const DAO = new TodoDAO;
        const tasks = await DAO.selectTasks()
        return response.status(200).json({
            success: true,
            tasks
        })
    }
    async GetTask(request: Request, response: Response) {
        const DAO = new TodoDAO;
        const tasks = await DAO.selectTask(request.params.id ?? '')
        return response.status(200).json({
            success: true,
            task: tasks
        })
    }

    async Insert(request: Request, response: Response) {
        const { task } = request.body
        const DAO = new TodoDAO;
        const id = randomUUID()
        DAO.insert(id, task)
        return response.status(200).json({
            success: true,
            message: "Task inserida."
        })
    }

    async Delete(request: Request, response: Response) {
        const id = request.params.id
        const DAO = new TodoDAO;
        DAO.delete(id)
        return response.status(200).json({
            success: true,
            message: "Task deletada."
        })
    }

    async Update(request: Request, response: Response) {
        const id = request.params.id
        let { task, description } = request.body
        if (task == '' || !task) {
            return response.status(500).json({
                success: false,
                message: "O nome da task é obrigatório"
            })
        }
        const DAO = new TodoDAO;
        DAO.update(id, task, description)
        return response.status(200).json({
            success: true,
            message: "Task atualizada"
        })
    }

async FinishTask(request: Request, response: Response) {
        const id = request.params.id
        const DAO = new TodoDAO;
        DAO.finishTask(id)
        return response.status(200).json({
            success: true,
            message: "Task finalizada"
        })
    }
}

export { TodoController }