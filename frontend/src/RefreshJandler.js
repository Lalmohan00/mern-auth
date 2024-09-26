import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const RefreshJandler = ({ setisAuthenticated }) => {
    const location = useLocation();
    const Navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setisAuthenticated(true);
            if (location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/signup'
            ) {
                Navigate('/home', { replace: false });
            }
        }
    }, [location, Navigate, setisAuthenticated])
    return (
        null
    )
}

export default RefreshJandler
