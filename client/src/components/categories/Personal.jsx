import  {React,useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { updatePersonalInfo } from '../actions/categoryAction';
import stand from "./stand.jpg"
export default function Personal() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const personalInfo = {
      firstName,
      lastName,
      email,
      phoneNumber,
      linkedin,
      github,
    };
    dispatch(updatePersonalInfo(personalInfo));
    navigate("/education")
  };
    return (
      <div>
      <img
      src={stand}
      alt="placeholder"
      style={{float:"left",width:"35em",height:"30em"}}
    />
        <Container component="main" maxWidth="xs" sx={{marginLeft:"40em"}}>
          <CssBaseline /> 
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h4" sx={{fontFamily:"serif",color:"#640D6B"}}>
              Personal details
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="off"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="off"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phonenumber"
                    label="Phonenumber"
                    type="phonenumber"
                    id="phonenumber"
                    autoComplete="off"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="linkedin"
                    label="Linkedin url"
                    name="linkedin"
                    autoComplete="off"
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="github"
                    label="Github url"
                    name="github"
                    autoComplete="off"
                    onChange={(e) => setGithub(e.target.value)}
                  />
              </Grid>
              </Grid>
              
            </Box>
            <Button variant="contained" onClick={handleSubmit} sx={{marginTop:"1.5em"}}>Next</Button>
          </Box>
        </Container>
        </div>
    );
  }