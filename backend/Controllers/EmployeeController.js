const EmployeeModel = require("../Models/Employee");

// Create a new employee
const addEmployee = async (req, res) => {
    try {
        const { name, employeeId, image, salary, designation, mobileNo } = req.body;
        const employee = new EmployeeModel({ name, employeeId, image, salary, designation, mobileNo });
        await employee.save();
        res.status(201).json({ message: "Employee added successfully", success: true, employee });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Get all employees
const getEmployees = async (req, res) => {
    try {
        const employees = await EmployeeModel.find();
        res.status(200).json({ success: true, employees });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Update employee by ID
const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const employee = await EmployeeModel.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json({ message: "Employee updated successfully", success: true, employee });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Delete employee by ID
const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        await EmployeeModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Employee deleted successfully", success: true });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = {
    addEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee
};
