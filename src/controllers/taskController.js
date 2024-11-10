const TaskModel = require("../models/taskModel.js")
const { notFoundError } = require("../errors/mongoDbErrors")

class TaskController {
  async getTasks(req, res) {
    const tasks = await TaskModel.find({})
    res.status(200).send(tasks)
  }
  async getTasksById(req, res) {
    try {
      const taskId = req.params.id
      const task = await TaskModel.findById(taskId)
      if (!task) {
        return notFoundError(res)
      } else {
        return res.status(200).send(task)
      }
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  async createTask(req, res) {
    try {
      const newTask = new TaskModel(req.body)
      await newTask.save()
      res.status(201).send(newTask)
    } catch (error) {
      res.status(400).send(error)
    }
  }

  async updateTask(req, res) {
    try {
      const taskId = req.params.id
      const taskData = req.body
      const taskToUpdate = await TaskModel.findById(taskId)
      if (!taskToUpdate) {
        return notFoundError(res)
      }
      const allowedUpdates = ["isCompleted"]
      const requestedUpdates = Object.keys(taskData)
      for (const update of requestedUpdates) {
        if (allowedUpdates.includes(update)) {
          taskToUpdate[update] = taskData[update]
        } else {
          return res.status(400).send("Update not allowed")
        }
      }
      await taskToUpdate.save()
      return res.status(200).send(taskToUpdate)
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  async deleteTask(req, res) {
    try {
      const taskId = req.params.id
      const taskToDelete = await TaskModel.findById(taskId)
      if (!taskToDelete) {
        return notFoundError(res)
      }
      const deletedTask = await TaskModel.findByIdAndDelete(taskId)
      res.status(200).send(deletedTask)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}

module.exports = TaskController
