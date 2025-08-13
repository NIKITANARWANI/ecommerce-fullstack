import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Logout() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout(); 
    const timer = setTimeout(() => {
      navigate('/'); 
    }, 2000);
    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>You have been logged out</h2>
      <p>Redirecting to login...</p>
    </div>
  );
}
