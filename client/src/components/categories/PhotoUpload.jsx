import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePhoto } from "../reducers/categoryReducer.js"; // Make sure this exists
import { Box, Button, Typography } from "@mui/material";

const PhotoUpload = () => {
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setPhoto(imageData);
        dispatch(updatePhoto(imageData)); // ✅ Dispatch to Redux store
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (photo) {
      navigate("/resume"); // ✅ Navigate after uploading
    } else {
      alert("Please upload a photo before proceeding.");
    }
  };

  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4">Upload Your Photo</Typography>

      {/* Image Preview or Upload Button */}
      {photo ? (
        <Box sx={{ mt: 3 }}>
          <img 
            src={photo} 
            alt="Uploaded" 
            style={{ width: 150, height: 150, borderRadius: "50%", border: "2px solid #ccc" }} 
          />
        </Box>
      ) : (
        <label htmlFor="photoInput">
          <Button variant="contained" component="span" sx={{ mt: 3 }}>
            Upload Photo
          </Button>
        </label>
      )}

      {/* Hidden File Input */}
      <input
        id="photoInput"
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        style={{ display: "none" }}
      />

      {/* Show "Upload Another Photo" if already uploaded */}
      {photo && (
        <Box sx={{ mt: 2 }}>
          <label htmlFor="photoInput">
            <Button variant="outlined" component="span">
              Upload Another Photo
            </Button>
          </label>
        </Box>
      )}

      {/* Next Button */}
      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!photo}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PhotoUpload;
