const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    employeeId: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 5,
    },
    image: {
        type: String,
    },
    salary: {
        type: Number,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: String,
        required: true,
    }
});

const EmployeeModel = mongoose.model('employees', EmployeeSchema);

module.exports = EmployeeModel;
