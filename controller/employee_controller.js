const BaseController = require('./BaseController');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const jwt = require('jsonwebtoken');

const employee_schema = require('../model/employee_schema');

module.exports = class employee_controller extends BaseController {
    async employee_insert(req, res) {
        try {
            const employee_data = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                position: req.body.position
            }

            const already_data = await employee_schema.findOne({phone: req.body.phone});

            if(already_data) {
                throw new Forbidden("Employee is already registered");
            }

            const employeeData = new employee_schema(employee_data);
            const employee = await employeeData.save();

            return this.sendJSONResponse(
                res,
                "employee added", 
                {
                    length: 1
                },
                employee
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }

    async employee_login(req, res) {
        try {
            const phone = req.body.phone;

            const employee = await employee_schema.find({phone: req.body.phone});

            if(employee.length === 0) {
                throw new Forbidden("Phone number is not registered");
            }

            const required_data = {
                id: employee[0]._id,
                name: employee[0].name,
                email: employee[0].email,
                phone: employee[0].phone,
                position: employee[0].position,
                hireDate: employee[0].hireDate
            }

            const token = jwt.sign(required_data, process.env.SECRET_KEY, { expiresIn:'365d' });

            const result = {
                token: token
            };

            return this.sendJSONResponse(
                res,
                "successfully login",
                {
                    length:1
                },
                result
            );

        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }

    async employee_display(req, res) {
        try {
            const tokenData = req.userdata;

            const employee = await employee_schema.findOne({_id: tokenData.id});

            if(!employee) {
                throw new Forbidden("You are not employee");
            }

            const employee_data = await employee_schema.findOne({_id: tokenData.id});

            return this.sendJSONResponse(
                res,
                "Employee Data", 
                {
                    length: 1
                },
                employee_data
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }

    async employee_update(req, res) {
        try {
            const tokenData = req.userdata;

            const employee = await employee_schema.findOne({_id: tokenData.id});

            if(!employee) {
                throw new Forbidden("You are not employee");
            }

            const new_data = {
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                position: req.body.position
            }

            const new_employee = await employee_schema.findByIdAndUpdate({_id: tokenData.id}, new_data, {new: true});

            return this.sendJSONResponse(
                res,
                "updated employee", 
                {
                    length: 1
                },
                new_employee
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }

    async employee_delete(req, res) {
        try {
            const tokenData = req.userdata;

            const employee = await employee_schema.findOne({_id: tokenData.id});

            if(!employee) {
                throw new Forbidden("You are not employee");
            }

            const new_employee = await employee_schema.findByIdAndDelete({_id: tokenData.id});

            return this.sendJSONResponse(
                res,
                "deleted employee", 
                {
                    length: 1
                },
                new_employee
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }
}