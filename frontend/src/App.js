import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import RefreshJandler from './RefreshJandler';
import NotFound from './NotFound';
import EmployeeManagement from './pages/EmployeeManagement';

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div className="App">
      <RefreshJandler setisAuthenticated={setisAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/emp' element={<EmployeeManagement />} />

        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;
