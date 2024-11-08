const express = require("express")
const TaskController = require("../controllers/taskController")
const TaskCtrl = new TaskController()

const router = express.Router()

router.get("/", TaskCtrl.index)
router.get("/:id", TaskCtrl.indexById)
router.post("/", TaskCtrl.store)
router.delete("/:id", TaskCtrl.delete)
router.patch("/:id", TaskCtrl.update)

module.exports = router
