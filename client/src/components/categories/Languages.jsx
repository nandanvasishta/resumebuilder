import React, { useState } from "react";
import { Container, Box, Typography, Grid, TextField, Button, Fab, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateLanguages } from "../actions/categoryAction"; // ✅ Ensure this function exists

export default function Languages() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Ensure correct Redux state selection
  const languagesInfo = useSelector((state) => state.category.languagesInfo || []);

  // ✅ Initialize state correctly
  const [languageList, setLanguageList] = useState(
    languagesInfo.length > 0 ? languagesInfo : [{ language: "", proficiency: "" }]
  );

  // ✅ Add new language entry
  const handleAddLanguage = () => {
    setLanguageList([...languageList, { language: "", proficiency: "" }]);
  };

  // ✅ Update input fields
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setLanguageList((prevList) => {
      const newList = [...prevList];
      newList[index] = { ...newList[index], [name]: value };
      return newList;
    });
  };

  // ✅ Delete language entry
  const handleDeleteLanguage = (index) => {
    setLanguageList((prevList) => {
      const newList = prevList.filter((_, i) => i !== index);
      return newList.length > 0 ? newList : [{ language: "", proficiency: "" }];
    });
  };

  // ✅ Save to Redux and navigate
  const handleSubmit = () => {
    dispatch(updateLanguages(languageList)); // Ensure action exists
    navigate("/interests"); // ✅ Navigate to Interests page
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 5, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>Languages</Typography>

        {languageList.map((language, index) => (
          <Box key={index} sx={{ mt: 3, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Language"
                  name="language"
                  value={language.language}
                  onChange={(e) => handleChange(index, e)}
                  required
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Proficiency"
                  name="proficiency"
                  value={language.proficiency}
                  onChange={(e) => handleChange(index, e)}
                  required
                />
              </Grid>
              <Grid item xs={2} sx={{ textAlign: "right" }}>
                <IconButton color="error" onClick={() => handleDeleteLanguage(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        ))}

        <Grid container justifyContent="center" spacing={2} sx={{ mt: 3 }}>
          <Grid item>
            <Fab color="primary" size="small" onClick={handleAddLanguage}>
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 1 }}>
              Next
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
