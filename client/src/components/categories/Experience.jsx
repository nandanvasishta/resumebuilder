import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, TextField, Grid, Fab, IconButton, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import { updateExperience } from "../actions/categoryAction";
import stand from "./stand.jpg";

const Experience = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Memoizing selector to prevent unnecessary re-renders
  const experienceInfo = useSelector((state) => state.category.experience?.experienceInfo || []);
  const memoizedExperience = useMemo(() => experienceInfo, [experienceInfo]);

  // Initialize state
  const [experience, setExperience] = useState(
    memoizedExperience.length > 0
      ? memoizedExperience
      : [{ positionTitle: "", companyName: "", startDate: null, endDate: null, description: "" }]
  );

  // Add new experience entry
  const handleAdd = () => {
    setExperience([
      ...experience,
      { positionTitle: "", companyName: "", startDate: null, endDate: null, description: "" },
    ]);
  };

  // Update input fields
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setExperience((prev) => {
      const updatedExperience = [...prev];
      updatedExperience[index] = { ...updatedExperience[index], [name]: value };
      return updatedExperience;
    });
  };

  // Update date fields
  const handleDateChange = (index, date, field) => {
    setExperience((prev) => {
      const updatedExperience = [...prev];
      updatedExperience[index] = { ...updatedExperience[index], [field]: date };
      return updatedExperience;
    });
  };

  // Delete an experience entry
  const handleDelete = (index) => {
    setExperience((prev) => {
      const updatedExperience = prev.filter((_, i) => i !== index);
      return updatedExperience.length > 0
        ? updatedExperience
        : [{ positionTitle: "", companyName: "", startDate: null, endDate: null, description: "" }];
    });
  };

  // Save to Redux and navigate
  const handleSubmit = () => {
    const formattedExperience = experience.map((exp) => ({
      ...exp,
      startDate: exp.startDate ? exp.startDate.toISOString().substring(0, 10) : null,
      endDate: exp.endDate ? exp.endDate.toISOString().substring(0, 10) : null,
    }));

    dispatch(updateExperience(formattedExperience));
    navigate("/skills");
  };

  return (
    <>
      <img src={stand} alt="placeholder" style={{ float: "left", width: "35em", height: "30em" }} />
      <Container component="main" maxWidth="xs" sx={{ marginLeft: "40em" }}>
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography component="h1" variant="h4" sx={{ fontFamily: "serif", color: "#640D6B" }}>
            Experience
          </Typography>

          {experience.map((exp, index) => (
            <Box key={index} component="form" noValidate sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Position Title"
                    name="positionTitle"
                    value={exp.positionTitle}
                    onChange={(event) => handleChange(index, event)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    name="companyName"
                    value={exp.companyName}
                    onChange={(event) => handleChange(index, event)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Date"
                      value={exp.startDate}
                      onChange={(date) => handleDateChange(index, date, "startDate")}
                      slotProps={{ textField: { fullWidth: true } }} // ✅ Fix for MUI v6+ Date Picker
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="End Date"
                      value={exp.endDate}
                      onChange={(date) => handleDateChange(index, date, "endDate")}
                      slotProps={{ textField: { fullWidth: true } }} // ✅ Fix for MUI v6+ Date Picker
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Description"
                    name="description"
                    value={exp.description}
                    onChange={(event) => handleChange(index, event)}
                  />
                </Grid>
                <Grid item xs={12} textAlign="right">
                  <IconButton color="error" onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))}

          {/* Buttons */}
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
            <Grid item>
              <Fab size="small" color="primary" onClick={handleAdd}>
                <AddIcon />
              </Fab>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Next
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Experience;
