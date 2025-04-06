import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/api'; // Your API function

export default function Signup() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      phone: Number(form.phone),
      password: Number(form.password),
    };

    try {
      const res = await signup(payload);
      if (res?.data) {
        alert('Signup successful!');
        navigate('/login');
      }
    } catch (err) {
      console.error('Signup failed:', err);
      alert('Signup failed!');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" sx={{ mt: 5 }}>Signup</Typography>
      <TextField label="First Name" name="first_name" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Last Name" name="last_name" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Phone" name="phone" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
      <Button variant="contained" fullWidth onClick={handleSubmit}>Signup</Button>
    </Container>
  );
}
