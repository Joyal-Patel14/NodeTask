const mongoose = require("mongoose");

const employee = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true
    },

    phone: {
        type: String,
        require: true
    },

    hireDate: {
        type: Date,
        default: Date.now
    },

    position: {
        type: String,
        require: true
    }

},{timestamps: true});

const employee_schema = new mongoose.model("employee", employee);

module.exports = employee_schema;
