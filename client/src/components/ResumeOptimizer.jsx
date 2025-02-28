import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAIResponse } from "../api"; // Ensure correct path
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const ResumeOptimizer = () => {
  const dispatch = useDispatch();
  const resumeData = useSelector((state) => state.category);
  const [loading, setLoading] = useState(false);
  const [optimizedResume, setOptimizedResume] = useState(null);
  const [error, setError] = useState(null);

  const handleOptimizeResume = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchAIResponse("optimize-resume", resumeData);

      if (response) {
        setOptimizedResume(response);
      } else {
        setError("Failed to optimize resume.");
      }
    } catch (err) {
      console.error("❌ AI Optimization Error:", err);
      setError("An error occurred while optimizing.");
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Typography variant="h5" gutterBottom>
        AI Resume Optimizer
      </Typography>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleOptimizeResume} 
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Optimize Resume"}
      </Button>

      {error && <Typography color="error">{error}</Typography>}

      {optimizedResume && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <Typography variant="h6">Optimized Resume:</Typography>
          <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
            {JSON.stringify(optimizedResume, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ResumeOptimizer;
