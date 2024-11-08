const express = require("express")
const dotenv = require("dotenv")
const connectToDatabase = require("./src/database/mongoose.database")
const TaskModel = require("./src/models/taskModel")
const TaskRouter = require("./src/routes/taskRoutes")

dotenv.config()

const app = express()
app.use(express.json())

connectToDatabase()

app.use("/tasks", TaskRouter)

app.listen(3000, () => {
  console.log("Listening on port 8000")
})
