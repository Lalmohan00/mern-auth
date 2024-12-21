import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../Utils';
import './EmployeeManagement.css'; // Import your CSS file

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [employeeData, setEmployeeData] = useState({
        name: '',
        employeeId: '',
        image: '',
        salary: '',
        designation: '',
        mobileNo: ''
    });
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    // Fetch employee data from the server
    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/employee', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const result = await response.json();
            if (response.ok) {
                setEmployees(result.employees);
            } else {
                handleError(result.message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const endpoint = editingId ? `/api/employee/${editingId}` : '/api/employee/add';

        try {
            const response = await fetch(`http://localhost:8080${endpoint}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(employeeData)
            });
            const result = await response.json();
            if (response.ok) {
                handleSuccess(editingId ? 'Employee updated successfully' : 'Employee added successfully');
                fetchEmployees();
                setEmployeeData({ name: '', employeeId: '', image: '', salary: '', designation: '', mobileNo: '' });
                setEditingId(null);
            } else {
                handleError(result.message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    const handleEdit = (employee) => {
        setEmployeeData(employee);
        setEditingId(employee._id);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const result = await response.json();
            if (response.ok) {
                handleSuccess('Employee deleted successfully');
                fetchEmployees();
            } else {
                handleError(result.message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User logged out successfully');
        navigate('/login');
    };

    return (
        <div>
            {/* Navigation Bar */}
            <div className="navbar">
                <button onClick={() => navigate('/')}>Home</button>
                <button onClick={() => navigate('/employees')}>Employees</button>
                <button className="logout" onClick={handleLogout}>Logout</button>
            </div>

            <h2>Employee Management</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={employeeData.name} onChange={handleInputChange} required />
                <input type="text" name="employeeId" placeholder="Employee ID" value={employeeData.employeeId} onChange={handleInputChange} required minLength={5} maxLength={5} />
                <input type="text" name="image" placeholder="Image URL" value={employeeData.image} onChange={handleInputChange} />
                <input type="number" name="salary" placeholder="Salary" value={employeeData.salary} onChange={handleInputChange} required />
                <input type="text" name="designation" placeholder="Designation" value={employeeData.designation} onChange={handleInputChange} required />
                <input type="text" name="mobileNo" placeholder="Mobile No" value={employeeData.mobileNo} onChange={handleInputChange} required />
                <button type="submit">{editingId ? "Update" : "Add"} Employee</button>
            </form>

            <h3>Employee List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Employee ID</th>
                        <th>Salary</th>
                        <th>Designation</th>
                        <th>Mobile No</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length ? (
                        employees.map((employee) => (
                            <tr key={employee._id}>
                                <td>{employee.name}</td>
                                <td>{employee.employeeId}</td>
                                <td>{employee.salary}</td>
                                <td>{employee.designation}</td>
                                <td>{employee.mobileNo}</td>
                                <td>
                                    <button onClick={() => handleEdit(employee)}>Edit</button>
                                    <button onClick={() => handleDelete(employee._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No employees found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeManagement;
