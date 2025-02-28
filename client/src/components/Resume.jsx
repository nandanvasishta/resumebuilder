import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";
import Template5 from "./Template5";
import ResumeOptimizer from "./ResumeOptimizer"; // ✅ Import AI Optimizer
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Resume = () => {
  const resumeRef = useRef(null);
  const [atsScore, setAtsScore] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");

  const resumeData = useSelector((state) => state.category);

  useEffect(() => {
    console.log("📢 Redux Updated State:", resumeData);
  }, [resumeData]);

  const data = useMemo(() => ({
    personal: {
      name: `${resumeData.personal?.firstName || ""} ${resumeData.personal?.lastName || ""}`.trim() || "Your Name",
      email: resumeData.personal?.email || "you@example.com",
      phone: resumeData.personal?.phoneNumber || "123-456-7890",
      linkedin: resumeData.personal?.linkedin || "",
      github: resumeData.personal?.github || "",
      address: resumeData.personal?.address || "Your Address",
    },
    education: resumeData.educationInfo || [],
    experience: resumeData.experienceInfo || [],
    skills: resumeData.skillsInfo || [],
    projects: resumeData.projectsInfo || [],
    certificates: resumeData.certificatesInfo || [],
    achievements: resumeData.achievementsInfo || [],
    languages: resumeData.languagesInfo || [],
    interests: resumeData.interestsInfo || [],
    references: resumeData.referencesInfo || [],
  }), [resumeData]);

  // Calculate ATS Score (Normalized to 100%)
  const calculateATSScore = useCallback(() => {
    let score = 0;
    let maxScore = 100; // Ensure score does not exceed 100%

    const sectionWeights = {
      email: 10,
      linkedin: 10,
      github: 0,
      education: 10,
      experience: 15,
      skills: 10,
      projects: 10,
      certificates: 5,
      achievements: 5,
      languages: 5,
      references: 5,
      interests: 5,
    };

    if (data.personal.email) score += sectionWeights.email;
    if (data.personal.linkedin) score += sectionWeights.linkedin;
    if (data.personal.github) score += sectionWeights.github;
    if (data.education.length) score += sectionWeights.education;
    if (data.experience.length) score += sectionWeights.experience;
    if (data.skills.length >= 5) score += sectionWeights.skills;
    if (data.projects.length) score += sectionWeights.projects;
    if (data.certificates.length) score += sectionWeights.certificates;
    if (data.achievements.length) score += sectionWeights.achievements;
    if (data.languages.length) score += sectionWeights.languages;
    if (data.references.length) score += sectionWeights.references;
    if (data.interests.length) score += sectionWeights.interests;

    // Normalize to 100%
    const atsPercentage = Math.min((score / maxScore) * 100, 100);
    console.log("Final ATS Score:", atsPercentage);
    return atsPercentage.toFixed(2);
  }, [data]);

  useEffect(() => {
    setAtsScore(calculateATSScore());
  }, [calculateATSScore]);

  // Generate PDF
  const generatePDF = useCallback(() => {
    if (!resumeRef.current) return;

    html2canvas(resumeRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, Math.min(pdfHeight, 297));
      pdf.save("resume.pdf");
    });
  }, []);

  // Render Selected Template
  const renderSelectedTemplate = useMemo(() => {
    const templates = {
      template1: <Template1 data={data} />,
      template2: <Template2 data={data} />,
      template3: <Template3 data={data} />,
      template4: <Template4 data={data} />,
      template5: <Template5 data={data} />,
    };
    return templates[selectedTemplate] || <Template1 data={data} />;
  }, [selectedTemplate, data]);

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

      <Button variant="contained" onClick={generatePDF} style={{ margin: "10px" }}>
        Download PDF
      </Button>

      {/* ✅ AI Resume Optimizer Integration */}
      <ResumeOptimizer />

      <div ref={resumeRef}>{renderSelectedTemplate}</div>
    </div>
  );
};

export default Resume;
