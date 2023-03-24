import { pool } from './connection';

class TodoDAO {

  async selectTasks() {
    const res = await pool.query(`SELECT * from tasks`).catch(err => {
      throw new Error(err);
    })
    return res[0]
  }
  async selectTask(id: string): Promise<any> {
    const res = await pool.query(`SELECT * from tasks where id = ? limit 1`, [id]).catch(err => {
      throw new Error(err);
    })
    return res[0]
  }

  async insert(id: string, task: string) {
    const res = await pool.query(`INSERT into tasks (id,task) values (?,?)`, [id, task]).catch(err => {
      throw new Error(err);
    })
    return res
  }

  async delete(id: string) {
    const res = await pool.query(`DELETE from tasks where id = ?`, [id]).catch(err => {
      throw new Error(err);
    })
    return res
  }
  async update(id: string, task: string, description: string) {
    const res = await pool.query(`UPDATE tasks set task=?, description=? where id = ?`,
      [task, description, id]).catch(err => {
        throw new Error(err);
      })
    return res
  }
  async finishTask(id: string) {
    const res = await pool.query(`UPDATE tasks set status=1 where id = ?`,
      [id]).catch(err => {
        throw new Error(err);
      })
    return res
  }

}

export { TodoDAO }