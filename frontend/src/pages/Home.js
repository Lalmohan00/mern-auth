import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../Utils';
import './Home.css'; // Ensure you have this CSS file

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]); // State for product data
    const [employees, setEmployees] = useState([]); // State for employee data

    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User logged out successfully');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchProducts = async () => {
        try {
            const url = "https://mern-auth-api-psi.vercel.app/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            };
            const response = await fetch(url, headers);
            const result = await response.json();
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    };

    const fetchEmployees = async () => {
        try {
            const url = "http://localhost:8080/api/employee";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            };
            const response = await fetch(url, headers);
            const result = await response.json();
            setEmployees(result.employees);
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchEmployees();
    }, []);

    return (
        <div>
            {/* Navigation Bar */}
            <div className="navbar">
                <button onClick={() => navigate('/')}>Home</button>
                <button onClick={() => navigate('/emp')}>Employees</button>
                <button className="logout" onClick={handleLogout}>Logout</button>
            </div>

            <h1>Welcome, {loggedInUser}</h1>

            <h2>Product List (Hard Coded)</h2>
            <div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Mobile No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{product.mobile_No}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h2>Employee List (Dynamic)</h2>
            <table style={{
                borderCollapse: 'collapse',
                border: '1px solid #ddd',
                width: '80%',
                margin: '20px auto',
                backgroundColor: 'white'
            }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd' }}>Name</th>
                        <th style={{ border: '1px solid #ddd' }}>Employee ID</th>
                        <th style={{ border: '1px solid #ddd' }}>Image</th>
                        <th style={{ border: '1px solid #ddd' }}>Salary</th>
                        <th style={{ border: '1px solid #ddd' }}>Designation</th>
                        <th style={{ border: '1px solid #ddd' }}>Mobile No</th>
                    </tr>
                </thead>
                <tbody>
                    {employees && employees.map((employee) => (
                        <tr key={employee._id}>
                            <td style={{ border: '1px solid #ddd' }}>{employee.name}</td>
                            <td style={{ border: '1px solid #ddd' }}>{employee.employeeId}</td>
                            <td style={{ border: '1px solid #ddd' }}>
                                <img src={employee.image} alt="Employee" style={{ width: '100px', borderRadius: '8px' }} />
                            </td>
                            <td style={{ border: '1px solid #ddd' }}>{employee.salary}</td>
                            <td style={{ border: '1px solid #ddd' }}>{employee.designation}</td>
                            <td style={{ border: '1px solid #ddd' }}>{employee.mobileNo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
