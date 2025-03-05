import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";
import Template5 from "./Template5";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";

const Resume = () => {
  const resumeRef = useRef(null);
  const [atsScore, setAtsScore] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [jobRole, setJobRole] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [profileImage, setProfileImage] = useState("");

  // Fetch Redux State
  const photo = useSelector((state) => state.category.photo || "");
  const resumeData = useSelector((state) => state.category);

  useEffect(() => {
    console.log("📢 Redux Updated State:", resumeData);
    console.log("📸 Photo in Redux:", photo);

    // Convert image URL to Base64 for proper rendering
    const toBase64 = async (url) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => resolve(reader.result);
        });
      } catch (error) {
        console.error("Error converting image to Base64:", error);
        return "";
      }
    };

    if (photo) {
      toBase64(photo).then((base64) => setProfileImage(base64));
    }
  }, [resumeData, photo]);

  const data = useMemo(() => ({
    personal: {
      name: `${resumeData.personal?.firstName || ""} ${resumeData.personal?.lastName || ""}`.trim() || "Your Name",
      email: resumeData.personal?.email || "you@example.com",
      phone: resumeData.personal?.phoneNumber || "123-456-7890",
      linkedin: resumeData.personal?.linkedin || "",
      github: resumeData.personal?.github || "",
      photo: profileImage || "",
    },
    education: resumeData.educationInfo || [],
    experience: resumeData.experienceInfo || [],
    skills: resumeData.skillsInfo || [],
    projects: resumeData.projectsInfo || [],
    certificates: resumeData.certificatesInfo || [], // ✅ Added Certificates
    achievements: resumeData.achievementsInfo || [], // ✅ Added Achievements
    languages: resumeData.languagesInfo || [], // ✅ Added Languages
    interests: resumeData.interestsInfo || [], // ✅ Added Interests
    references: resumeData.referencesInfo || [], // ✅ Added References
  }), [resumeData, profileImage]);

  const fetchAISummary = useCallback(async () => {
    if (!jobRole.trim()) {
      alert("Please enter a job role for AI resume summary!");
      return;
    }

    try {
      console.log("🔄 Fetching AI Summary...");
      const response = await axios.post("http://localhost:5001/ai/generate-summary", { jobRole, resumeData: data });

      console.log("✅ AI Summary Response:", response.data);
      setAiSummary(response.data.summary);
    } catch (error) {
      console.error("❌ AI Summary Fetch Error:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.error || "Something went wrong"}`);
    }
  }, [jobRole, data]);

  const generatePDF = useCallback(() => {
    if (!resumeRef.current) return;

    html2canvas(resumeRef.current, { 
      scale: 2,
      useCORS: true, 
      allowTaint: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, Math.min(pdfHeight, 297));
      pdf.save("resume.pdf");
    });
  }, []);

  const renderSelectedTemplate = useMemo(() => {
    const templates = {
      template1: <Template1 data={data} aiSummary={aiSummary} />,
      template2: <Template2 data={data} aiSummary={aiSummary} />,
      template3: <Template3 data={data} aiSummary={aiSummary} />,
      template4: <Template4 data={data} aiSummary={aiSummary} />,
      template5: <Template5 data={data} aiSummary={aiSummary} />,
    };
    return templates[selectedTemplate] || <Template1 data={data} aiSummary={aiSummary} />;
  }, [selectedTemplate, data, aiSummary]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>ATS Score: {atsScore}%</h2>

      <Select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)} style={{ marginBottom: "10px" }}>
        <MenuItem value="template1">Template 1</MenuItem>
        <MenuItem value="template2">Template 2</MenuItem>
        <MenuItem value="template3">Template 3</MenuItem>
        <MenuItem value="template4">Template 4</MenuItem>
        <MenuItem value="template5">Template 5</MenuItem>
      </Select>

      <input
        type="text"
        placeholder="Enter job role"
        value={jobRole}
        onChange={(e) => setJobRole(e.target.value)}
        style={{ margin: "10px", padding: "5px" }}
      />
      <Button variant="contained" onClick={fetchAISummary}>
        Generate AI Summary
      </Button>

      <Button variant="contained" onClick={generatePDF}>
        Download PDF
      </Button>

      <div ref={resumeRef}>{renderSelectedTemplate}</div>
    </div>
  );
};

export default Resume;
