import React, { useState } from "react";
import { Container, Box, Typography, Grid, TextField, Button, Fab, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateReferences } from "../actions/categoryAction"; // ✅ Fixed import

export default function References() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get existing references from Redux
  const referencesInfo = useSelector(
    (state) => state.category.referencesInfo || []
  );

  // Initialize state
  const [referenceDetails, setReferenceDetails] = useState(
    referencesInfo.length > 0
      ? referencesInfo
      : [{ name: "", jobTitle: "", company: "", email: "", phone: "" }]
  );

  // Add new reference entry
  const handleAddReference = () => {
    setReferenceDetails([
      ...referenceDetails,
      { name: "", jobTitle: "", company: "", email: "", phone: "" },
    ]);
  };

  // Update input fields
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setReferenceDetails((prevDetails) => {
      const newDetails = [...prevDetails];
      newDetails[index] = { ...newDetails[index], [name]: value };
      return newDetails;
    });
  };

  // Delete reference entry
  const handleDeleteReference = (index) => {
    setReferenceDetails((prevDetails) => {
      const newDetails = prevDetails.filter((_, i) => i !== index);
      return newDetails.length > 0
        ? newDetails
        : [{ name: "", jobTitle: "", company: "", email: "", phone: "" }];
    });
  };

  // Save to Redux and navigate
  const handleSubmit = () => {
    dispatch(updateReferences(referenceDetails));
    navigate("/resume"); // ✅ Navigates to the resume page
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 5, textAlign: "center" }}>
        <Typography variant="h4">References</Typography>

        {referenceDetails.map((ref, index) => (
          <Box key={index} sx={{ mt: 3, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={ref.name}
                  onChange={(e) => handleChange(index, e)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="jobTitle"
                  value={ref.jobTitle}
                  onChange={(e) => handleChange(index, e)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  value={ref.company}
                  onChange={(e) => handleChange(index, e)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={ref.email}
                  onChange={(e) => handleChange(index, e)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={ref.phone}
                  onChange={(e) => handleChange(index, e)}
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "right" }}>
                <IconButton color="error" onClick={() => handleDeleteReference(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        ))}

        <Grid container justifyContent="center" spacing={2} sx={{ mt: 3 }}>
          <Grid item>
            <Fab color="primary" size="small" onClick={handleAddReference}>
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
