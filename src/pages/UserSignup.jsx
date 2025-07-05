// src/pages/UserSignup.jsx
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UserSignup = () => {
  const { id } = useParams(); // Xerox shop ID from QR
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.xeroxId);
      navigate(`/upload/${id}`);
    } catch (err) {
      alert('Signup failed: ' + (err.response?.data.message || err.message));
    }
  };

  return (
    <div>
      <h2>Sign Up to Upload to Xerox {id}</h2>
      <form onSubmit={handleSignup}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href={`/login/${id}`}>Login</a></p>
    </div>
  );
};

export default UserSignup;
