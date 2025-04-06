import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const payload = {
      email: form.email,
      password: Number(form.password), // Convert to number
    };
  
    try {
      const res = await login(payload);
      if (res.data) {
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/users');
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed!');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" sx={{ mt: 5 }}>Login</Typography>
      <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
      <Button variant="contained" fullWidth onClick={handleSubmit}>Login</Button>
    </Container>
  );
}
