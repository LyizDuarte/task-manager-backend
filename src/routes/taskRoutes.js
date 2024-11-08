const express = require("express")
const TaskModel = require("../models/taskModel")

const router = express.Router()

router.get("/", async (req, res) => {
  const tasks = await TaskModel.find({})
  res.status(200).send(tasks)
})

router.get("/:id", async (req, res) => {
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
})

router.post("/", async (req, res) => {
  try {
    const newTask = new TaskModel(req.body)
    await newTask.save()
    res.status(201).send(newTask)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const taskId = req.params.id
    const deletedTask = await TaskModel.findByIdAndDelete(taskId)
    res.status(200).send(deletedTask)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.patch("/:id", async (req, res) => {
  try {
    const taskId = req.params.id
    const taskData = req.body
    const taskToUpdate = await TaskModel.findById(taskId)
    const allowedUpdates = ["isCompleted"]
    const requestedUpdates = Object.keys(taskData)
    for (update of requestedUpdates) {
      if (allowedUpdates.includes(update)) {
        taskToUpdate[update] = taskData[update]
      } else {
        return res.status(500).send("Update not allowed")
      }
    }
    await taskToUpdate.save()
    return res.status(200).send(taskToUpdate)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

module.exports = router
