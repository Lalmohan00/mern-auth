import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../Utils';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setproducts] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User  logged out successfully');

        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    const fetchProducts = async () => {
        try {
            const url = "https://mern-auth-api-psi.vercel.app/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers)
            const result = await response.json();
            setproducts(result)
            console.log("result===", result)
        } catch (err) {
            handleError(err)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <div>
            <h1>{loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>
                {
                    products && products?.map((item, index) => (
                        <ul key={index}>
                            <span>{item.name} : {item.mobile_No}</span>
                        </ul>
                    ))
                }
            </div>
        </div>
    )
}

export default Home
