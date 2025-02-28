import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateEducation } from '../actions/categoryAction';
import {
  Container,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Fab,
  Button
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Education() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const educationInfo = useSelector(state => state.category.educationInfo);
  
  const [educationalDetails, setEducationalDetails] = useState(educationInfo.length ? educationInfo : [{
    college: '',
    degree: '',
    startDate: null,
    endDate: null,
    gpa: ''
  }]);

  const handleAddDetail = () => {
    setEducationalDetails(prevDetails => [...prevDetails, {
      college: '',
      degree: '',
      startDate: null,
      endDate: null,
      gpa: ''
    }]);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setEducationalDetails(prevDetails => {
      const newDetails = [...prevDetails];
      newDetails[index] = { ...newDetails[index], [name]: value };
      return newDetails;
    });
  };

  const handleDateChange = (index, date, field) => {
    setEducationalDetails(prevDetails => {
      const newDetails = [...prevDetails];
      newDetails[index] = { ...newDetails[index], [field]: date };
      return newDetails;
    });
  };

  const handleDeleteDetail = (index) => {
    setEducationalDetails(prevDetails => prevDetails.filter((_, i) => i !== index));
  };

  const handleClick = () => {
    const serializedDetails = educationalDetails.map(detail => ({
      ...detail,
      startDate: detail.startDate ? detail.startDate.toISOString().substring(0, 4) : null,
      endDate: detail.endDate ? detail.endDate.toISOString().substring(0, 4) : null
    }));

    console.log("Dispatching Education Info:", serializedDetails); // Debugging log
    dispatch(updateEducation(serializedDetails));
    navigate("/experience");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" sx={{ fontFamily: "serif", color: "#640D6B" }}>
          Educational Details
        </Typography>
        {educationalDetails.map((detail, index) => (
          <Box key={index} component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth name="college" label="College" value={detail.college} onChange={(e) => handleChange(index, e)} required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="degree" label="Degree" value={detail.degree} onChange={(e) => handleChange(index, e)} required />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker label="Start Year" views={['year']} value={detail.startDate} onChange={(date) => handleDateChange(index, date, 'startDate')} />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker label="End Year" views={['year']} value={detail.endDate} onChange={(date) => handleDateChange(index, date, 'endDate')} />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="gpa" label="GPA" value={detail.gpa} onChange={(e) => handleChange(index, e)} required />
              </Grid>
              <Grid item xs={12}>
                <DeleteIcon onClick={() => handleDeleteDetail(index)} />
              </Grid>
            </Grid>
          </Box>
        ))}
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <Fab size="medium" color="secondary" aria-label="add" onClick={handleAddDetail}>
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleClick} sx={{ marginLeft: "1.5em" }}>Next</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
