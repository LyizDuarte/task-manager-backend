const express = require("express")
const dotenv = require("dotenv")
const connectToDatabase = require("./src/database/mongoose.database")
const TaskModel = require("./src/models/taskModel")

dotenv.config()

const app = express()
app.use(express.json())

connectToDatabase()

app.get("/tasks", async (req, res) => {
  const tasks = await TaskModel.find({})
  res.status(200).send(tasks)
})

app.get("/tasks/:id", async (req, res) => {
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

app.post("/tasks", async (req, res) => {
  try {
    const newTask = new TaskModel(req.body)
    await newTask.save()
    res.status(201).send(newTask)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id
    const deletedTask = await TaskModel.findByIdAndDelete(taskId)
    res.status(200).send(deletedTask)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.listen(3000, () => {
  console.log("Listening on port 8000")
})
