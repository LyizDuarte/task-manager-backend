const express = require("express")
const TaskController = require("../controllers/taskController")
const TaskCtrl = new TaskController()

const router = express.Router()

router.get("/", TaskCtrl.getTasks)
router.get("/:id", TaskCtrl.getTasksById)
router.post("/", TaskCtrl.createTask)
router.delete("/:id", TaskCtrl.deleteTask)
router.patch("/:id", TaskCtrl.updateTask)

module.exports = router
