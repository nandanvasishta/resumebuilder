import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid, Link, CssBaseline, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from './actions/authAction';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    dispatch(login(email, password))
      .then(() => navigate('/home'))
      .catch(err => alert(err)); // Show error message if login fails
  };

  return (
    <div>
      <CssBaseline />
      <div style={{ backgroundImage: 'linear-gradient(45deg, #0F2167 20%, #4CB9E7 95%)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: "white"
            }}
          >
            <Typography component="h1" variant="h4" style={{ fontFamily: "serif" }}>
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  InputLabelProps={{ style: { color: 'white' } }}
                  sx={{ input: { color: "white" } }} // Fix text color
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  InputLabelProps={{ style: { color: 'white' } }}
                  sx={{ input: { color: "white" } }} // Fix text color
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, color: "white" }}
                >
                  Login
                </Button>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signup" variant="body2" sx={{ color: "white" }}>
                    Don't have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default Login;
