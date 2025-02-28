import React, { useState } from "react";
import { Container, Box, Typography, Grid, TextField, Button, Fab, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateInterests } from "../actions/categoryAction"; // ✅ Fixed import

export default function Interests() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get existing interests from Redux
  const interestsInfo = useSelector(
    (state) => state.category.interestsInfo || []
  );

  // Initialize state
  const [interestList, setInterestList] = useState(
    interestsInfo.length > 0 ? interestsInfo : [""]
  );

  // Add new interest
  const handleAddInterest = () => {
    setInterestList([...interestList, ""]);
  };

  // Update input fields
  const handleChange = (index, event) => {
    const { value } = event.target;
    setInterestList((prevList) => {
      const newList = [...prevList];
      newList[index] = value;
      return newList;
    });
  };

  // Delete an interest entry
  const handleDeleteInterest = (index) => {
    setInterestList((prevList) => {
      const newList = prevList.filter((_, i) => i !== index);
      return newList.length > 0 ? newList : [""];
    });
  };

  // Save to Redux and navigate
  const handleSubmit = () => {
    const filteredInterests = interestList.map((i) => i.trim()).filter((i) => i !== "");
    if (filteredInterests.length === 0) return;

    dispatch(updateInterests(filteredInterests)); // ✅ Fixed function name
    navigate("/references"); // ✅ Navigates to References.jsx
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 5, textAlign: "center" }}>
        <Typography variant="h4">Interests</Typography>

        {interestList.map((interest, index) => (
          <Box key={index} sx={{ mt: 3, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  label="Interest"
                  value={interest}
                  onChange={(e) => handleChange(index, e)}
                  required
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton color="error" onClick={() => handleDeleteInterest(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        ))}

        <Grid container justifyContent="center" spacing={2} sx={{ mt: 3 }}>
          <Grid item>
            <Fab color="primary" size="small" onClick={handleAddInterest}>
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleSubmit}>Next</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
