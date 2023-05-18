const mongoose = require("mongoose");

const task = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    dueDate: {
        type: Date,
        require: true
    },

    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
},{timestamps: true});

const task_schema = new mongoose.model("task", task);

module.exports = task_schema;