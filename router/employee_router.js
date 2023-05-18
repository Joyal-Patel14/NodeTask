const express = require('express');
const router = express.Router();
const adminUserAuth = require('../middleware/admin-user-auth');

const employee_controller = require("../controller/employee_controller");
const employeeController = new employee_controller();

router.post("/", (req, res) => employeeController.employee_insert(req, res));
router.post("/login", (req, res) => employeeController.employee_login(req, res));
router.get("/", adminUserAuth, (req, res) => employeeController.employee_display(req, res));
router.put("/", adminUserAuth, (req, res) => employeeController.employee_update(req, res));
router.delete("/", adminUserAuth, (req, res) => employeeController.employee_delete(req, res));

module.exports = router;