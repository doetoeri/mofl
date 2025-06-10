import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { setToken } from '../store/authSlice';

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    await axios.post('/api/auth/login', { name, email });
    alert('Check server console for magic link token');
  };

  const handleVerify = async () => {
    const token = prompt('Enter token from server log');
    const res = await axios.get(`/api/auth/verify?token=${token}`);
    dispatch(setToken(res.data.token));
  };

  return (
    <div>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>Request Link</Button>
      <Button onClick={handleVerify}>Enter Token</Button>
    </div>
  );
}
