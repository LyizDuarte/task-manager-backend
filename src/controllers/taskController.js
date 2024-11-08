const TaskModel = require("../models/taskModel.js")

class TaskController {
  async index(req, res) {
    const tasks = await TaskModel.find({})
    res.status(200).send(tasks)
  }
  async indexById(req, res) {
    try {
      const taskId = req.params.id
      const task = await TaskModel.findById(taskId)
      if (!task) {
        res.status(404).send("Task not found")
      } else {
        return res.status(200).send(task)
      }
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  async store(req, res) {
    try {
      const newTask = new TaskModel(req.body)
      await newTask.save()
      res.status(201).send(newTask)
    } catch (error) {
      res.status(400).send(error)
    }
  }

  async update(req, res) {
    try {
      const taskId = req.params.id
      const taskData = req.body
      const taskToUpdate = await TaskModel.findById(taskId)
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

  async delete(req, res) {
    try {
      const taskId = req.params.id
      const deletedTask = await TaskModel.findByIdAndDelete(taskId)
      res.status(200).send(deletedTask)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}

module.exports = TaskController
