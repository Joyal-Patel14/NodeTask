const express = require('express');
const router = express.Router();
const adminUserAuth = require('../middleware/admin-user-auth');

const task_controller = require('../controller/task_controller');
const taskController = new task_controller();

router.post("/", adminUserAuth, (req, res) => taskController.task_insert(req, res));
router.get("/", adminUserAuth, (req, res) => taskController.task_display(req, res));
router.put("/", adminUserAuth, (req, res) => taskController.task_update(req, res));
router.delete("/", adminUserAuth, (req, res) => taskController.task_delete(req, res));

module.exports = router;