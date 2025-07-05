// src/pages/UserLogin.jsx
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UserLogin = () => {
  const { id } = useParams(); // Xerox ID
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.xeroxId);
      navigate(`/upload/${id}`);
    } catch (err) {
      alert('Login failed: ' + (err.response?.data.message || err.message));
    }
  };

  return (
    <div>
      <h2>Login to Upload to Xerox {id}</h2>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;
