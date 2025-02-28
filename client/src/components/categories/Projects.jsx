import React, { useState } from "react";
import { Container, Typography, TextField, Grid, Box, Fab } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProjects } from "../actions/categoryAction"; // ✅ Fixed Import
import stand from "./stand.jpg";

const Projects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projectsInfo = useSelector(state => state.category.projectsInfo || []); // ✅ Fixed useSelector

  // Ensure at least one input field appears
  const [projects, setProjects] = useState(
    projectsInfo.length > 0 ? projectsInfo : [{ projectTitle: "", projectLink: "", description: "" }]
  );

  const handleAdd = () => {
    setProjects(prev => [...prev, { projectTitle: "", projectLink: "", description: "" }]);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setProjects(prevDetails => {
      const newDetails = [...prevDetails];
      newDetails[index] = { ...newDetails[index], [name]: value };
      return newDetails;
    });
  };

  const handleDelete = index => {
    setProjects(prevDetails => {
      const newDetails = prevDetails.filter((_, i) => i !== index);
      return newDetails.length ? newDetails : [{ projectTitle: "", projectLink: "", description: "" }];
    });
  };

  const handleClick = () => {
    dispatch(updateProjects(projects)); // ✅ Fixed Dispatch
    navigate("/certify");
  };

  return (
    <>
      <img src={stand} alt="placeholder" style={{ float: "left", width: "35em", height: "30em" }} />
      <Container component="main" maxWidth="xs" sx={{ marginLeft: "40em" }}>
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography component="h1" variant="h4" sx={{ fontFamily: "serif", color: "#640D6B" }}>
            Projects
          </Typography>
          {projects.map((project, index) => (
            <Box key={index} component="form" noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="projectTitle"
                    label="Project title"
                    value={project.projectTitle}
                    onChange={event => handleChange(index, event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="projectLink"
                    label="Project Link"
                    value={project.projectLink}
                    onChange={event => handleChange(index, event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="description"
                    label="Description"
                    multiline
                    rows={3}
                    fullWidth
                    required
                    name="description"
                    value={project.description}
                    onChange={event => handleChange(index, event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DeleteIcon onClick={() => handleDelete(index)} style={{ cursor: "pointer" }} />
                </Grid>
              </Grid>
            </Box>
          ))}
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              <Fab size="medium" color="secondary" aria-label="add" onClick={handleAdd}>
                <AddIcon />
              </Fab>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleClick} sx={{ marginLeft: "1.5em" }}>
                Next
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Projects;
