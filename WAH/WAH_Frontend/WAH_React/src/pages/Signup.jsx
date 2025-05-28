import React from 'react'
import SignupForm from '../containers/auth/signup'
import { Container, Typography, Paper } from '@mui/material';

const Signup = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#5A52FF' }}>
          Create Your Account
        </Typography>
        <SignupForm />
      </Paper>
    </Container>
  );
};

export default Signup;
