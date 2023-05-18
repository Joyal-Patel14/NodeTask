const BaseController = require('./BaseController');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

const employee_schema = require('../model/employee_schema');
const task_schema = require('../model/task_schema');

module.exports = class task_controller extends BaseController {
    async task_insert(req, res) {
        try {
            const tokenData = req.userdata;

            const employee = await employee_schema.findOne({_id: tokenData.id});
    
            if(!employee) {
                throw new Forbidden("You are not employee");
            }
    
            const data = {
                title: req.body.title,
                description: req.body.description,
                dueDate: Date.now(),
                employeeId: tokenData.id
            }
    
            const taskData = new task_schema(data);
            const task = await taskData.save();
    
            return this.sendJSONResponse(
                res,
                "task added", 
                {
                    length: 1
                },
                task
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }

    async task_display(req, res) {
        try {
            const tokenData = req.userdata;

            const employee = await employee_schema.findOne({_id: tokenData.id});
    
            if(!employee) {
                throw new Forbidden("You are not employee");
            }

            const tasks = await task_schema.find({employeeId: tokenData.id});

            return this.sendJSONResponse(
                res,
                "tasks", 
                {
                    length: 1
                },
                tasks
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }

    async task_update(req, res) {
        try {
            const tokenData = req.userdata;
            const id = req.query.id;

            const employee = await employee_schema.findOne({_id: tokenData.id});
    
            if(!employee) {
                throw new Forbidden("You are not employee");
            }

            const new_data = {
                title: req.body.title,
                description: req.body.description
            }

            const new_task = await task_schema.findByIdAndUpdate({_id: id}, new_data, {new: true});

            return this.sendJSONResponse(
                res,
                "updated task", 
                {
                    length: 1
                },
                new_task
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }

    async task_delete(req, res) {
        try {
            const tokenData = req.userdata;
            const id = req.query.id;

            const employee = await employee_schema.findOne({_id: tokenData.id});
    
            if(!employee) {
                throw new Forbidden("You are not employee");
            }

            const new_task = await task_schema.findByIdAndDelete({_id: id});

            return this.sendJSONResponse(
                res,
                "deleted task", 
                {
                    length: 1
                },
                new_task
            );
        } catch (error) {
            if(error instanceof NotFound){
                throw error;
            }
            return this.sendErrorResponse(req, res, error);
        }
    }
}