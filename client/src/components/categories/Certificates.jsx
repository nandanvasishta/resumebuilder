import React, { useState } from "react";
import { Container, Typography, TextField, Grid, Box, Fab } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCertificates } from "../actions/categoryAction"; // ✅ Fixed import name
import stand from "./stand.jpg";

const Certificates = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Get stored certificates or start with an empty entry
  const certificatesInfo = useSelector(state => state.category.certificatesInfo || []);

  const [certificates, setCertificates] = useState(
    certificatesInfo.length > 0 ? certificatesInfo : [{ certificateName: "", certificateLink: "" }]
  );

  const handleAdd = () => {
    setCertificates(prev => [...prev, { certificateName: "", certificateLink: "" }]);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setCertificates(prevDetails => {
      const newDetails = [...prevDetails];
      newDetails[index] = { ...newDetails[index], [name]: value };
      return newDetails;
    });
  };

  const handleDelete = index => {
    setCertificates(prevDetails => {
      const newDetails = [...prevDetails];
      newDetails.splice(index, 1);
      return newDetails.length ? newDetails : [{ certificateName: "", certificateLink: "" }];
    });
  };

  const handleClick = () => {
    dispatch(updateCertificates(certificates)); // ✅ Updated action name
    navigate("/achievements"); // ✅ Navigate to Achievements page
  };

  return (
    <>
      <img src={stand} alt="placeholder" style={{ float: "left", width: "35em", height: "30em" }} />
      <Container component="main" maxWidth="xs" sx={{ marginLeft: "40em" }}>
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography component="h1" variant="h4" sx={{ fontFamily: "serif", color: "#640D6B" }}>
            Certifications
          </Typography>
          {certificates.map((certificate, index) => (
            <Box key={index} component="form" noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="certificateName"
                    label="Certificate Name"
                    value={certificate.certificateName}
                    onChange={event => handleChange(index, event)}
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="certificateLink"
                    label="Certificate Link"
                    value={certificate.certificateLink}
                    required
                    onChange={event => handleChange(index, event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DeleteIcon onClick={() => handleDelete(index)} />
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

export default Certificates;
