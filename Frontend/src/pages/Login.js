import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import clevertap from '../utils/clevertap.js';
import { UserContext } from '../context/UserContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserContext);
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post('http://localhost:3500/auth/login', { email, password });

      const userData = {
        Site: {
          Name: data.user.email.split('@')[0],
          Identity: data.user.email,
          Email: data.user.email,
          'MSG-email': true,
          'MSG-push': true,
        },
      };

    
      clevertap.onUserLogin.push(userData);

      clevertap.profile.push({
        "Site": {
          "Customer type": "Gold",
          "Preferred Language": "English",
          "Name": data.user.name,
          "Gender":"female",
        }
      });

      login(); // Update context state
      nav('/home');
    } catch (e) {
      alert('Login failed');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
