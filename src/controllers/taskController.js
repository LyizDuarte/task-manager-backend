const TaskModel = require("../models/taskModel.js")
const { notFoundError, objectIdCastError } = require("../errors/mongoDbErrors")
const { notAllowedFieldsToUpdateError } = require("../errors/generalErros")
const { default: mongoose } = require("mongoose")

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
      }
      return res.status(200).send(task)
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return objectIdCastError(res)
      }
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
          return notAllowedFieldsToUpdateError(res)
        }
      }
      await taskToUpdate.save()
      return res.status(200).send(taskToUpdate)
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return objectIdCastError(res)
      }
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
      if (error instanceof mongoose.Error.CastError) {
        return objectIdCastError(res)
      }
    }
  }
}

module.exports = TaskController
