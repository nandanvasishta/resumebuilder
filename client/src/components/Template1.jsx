import React from "react";
import "./ResumeStyles.css";

const flattenArray = (arr) => (Array.isArray(arr) ? arr.flat() : []);

const Template1 = ({ data = {}, aiSummary = "" }) => {
  console.log("📢 Received Data:", data);

  // Ensure defaults & flatten nested arrays
  const safeData = {
    personal: {
      name: data.personal?.name || "Your Name",
      email: data.personal?.email || "example@email.com",
      phone: data.personal?.phone || "000-000-0000",
      linkedin: data.personal?.linkedin || "",
      github: data.personal?.github || "",
      photo: data.personal?.photo?.trim() || "/default-profile.png",
    },
    education: flattenArray(data.education ?? []),
    experience: flattenArray(data.experience ?? []),
    skills: flattenArray(data.skills ?? []),
    projects: flattenArray(data.projects ?? []),
    certificates: flattenArray(data.certificates ?? []),
    achievements: flattenArray(data.achievements ?? []),
    languages: flattenArray(data.languages ?? []),
    interests: flattenArray(data.interests ?? []),
    references: flattenArray(data.references ?? []),
  };

  console.log("✅ Processed Data:", safeData);

  return (
    <div className="resume-container template1">
      {/* Sidebar */}
      <div className="resume-sidebar">
        <h1>{safeData.personal.name}</h1>

        <img
          src={safeData.personal.photo}
          alt="Profile"
          className="resume-photo"
          onError={(e) => {
            console.error("❌ Image failed to load:", e.target.src);
            e.target.onerror = null;
            e.target.src = "/default-profile.png";
          }}
        />

        <p>Email: {safeData.personal.email}</p>
        <p>Phone: {safeData.personal.phone}</p>
        {safeData.personal.linkedin && <p>LinkedIn: {safeData.personal.linkedin}</p>}
        {safeData.personal.github && <p>GitHub: {safeData.personal.github}</p>}
      </div>

      {/* Main Resume Content */}
      <div className="resume-main">
        {/* AI Summary */}
        {aiSummary && (
          <div className="resume-section">
            <h2>Description</h2>
            <p>{aiSummary}</p>
          </div>
        )}

        {/* Education */}
        <div className="resume-section">
          <h2>Education</h2>
          {safeData.education.length > 0 ? (
            safeData.education.map((edu, index) => (
              <div key={index}>
                <h3>{edu.degree || "Degree Not Provided"} - {edu.college || "Institution Not Provided"}</h3>
                <p>{edu.startDate || "N/A"} - {edu.endDate || "N/A"} | GPA: {edu.gpa || "N/A"}</p>
              </div>
            ))
          ) : (
            <p>No education details provided.</p>
          )}
        </div>

        {/* Experience */}
        <div className="resume-section">
          <h2>Experience</h2>
          {safeData.experience.length > 0 ? (
            safeData.experience.map((exp, index) => (
              <div key={index}>
                <h3>{exp.positionTitle || "Position Not Provided"} at {exp.companyName || "Company Not Provided"}</h3>
                <p>{exp.startDate || "N/A"} - {exp.endDate || "N/A"}</p>
                <p>{exp.description || "No description provided."}</p>
              </div>
            ))
          ) : (
            <p>No work experience provided.</p>
          )}
        </div>

        {/* Skills */}
        <div className="resume-section">
          <h2>Skills</h2>
          <p>{safeData.skills.length > 0 ? safeData.skills.join(", ") : "No skills provided."}</p>
        </div>

        {/* Projects */}
        <div className="resume-section">
          <h2>Projects</h2>
          {safeData.projects.length > 0 ? (
            safeData.projects.map((project, index) => (
              <div key={index}>
                <h3>{project.projectTitle || "Project Title Not Provided"}</h3>
                {project.projectLink && <a href={project.projectLink}>{project.projectLink}</a>}
                <p>{project.description || "No description provided."}</p>
              </div>
            ))
          ) : (
            <p>No projects listed.</p>
          )}
        </div>

        {/* Certifications */}
        <div className="resume-section">
          <h2>Certifications</h2>
          {safeData.certificates.length > 0 ? (
            safeData.certificates.map((cert, index) => (
              <div key={index}>
                <h3>{cert.certificateName || "Certification Name Not Provided"}</h3>
                {cert.certificateLink && <a href={cert.certificateLink}>{cert.certificateLink}</a>}
              </div>
            ))
          ) : (
            <p>No certifications listed.</p>
          )}
        </div>

        {/* Achievements */}
        <div className="resume-section">
  <h2>Achievements</h2>
  {safeData.achievements.length > 0 ? (
    safeData.achievements.map((achieve, index) => (
      <div key={index}>
        <p>
          {achieve.award || "Achievement Not Provided"}
          {achieve.achievementLink && (
            <> - <a href={achieve.achievementLink} target="_blank" rel="noopener noreferrer">
              {achieve.achievementLink}
            </a></>
          )}
        </p>
      </div>
    ))
  ) : (
    <p>No achievements listed.</p>
  )}
</div>

        {/* Languages */}
        <div className="resume-section">
          <h2>Languages</h2>
          {safeData.languages.length > 0 ? (
            safeData.languages.map((lang, index) => (
              <p key={index}>{lang.language || "Language Not Provided"} - {lang.proficiency || "Proficiency Not Provided"}</p>
            ))
          ) : (
            <p>No languages listed.</p>
          )}
        </div>

        {/* Interests */}
        <div className="resume-section">
          <h2>Interests</h2>
          <p>{safeData.interests.length > 0 ? safeData.interests.join(", ") : "No interests listed."}</p>
        </div>

        {/* References */}
        <div className="resume-section">
          <h2>References</h2>
          {safeData.references.length > 0 ? (
            safeData.references.map((ref, index) => (
              <div key={index}>
                <h3>{ref.name || "Reference Name Not Provided"}</h3>
                <p>{ref.company || "Company Not Provided"} | {ref.position || "Position Not Provided"}</p>
                <p>Phone: {ref.phone || "N/A"}</p>
                <p>Email: {ref.email || "N/A"}</p>
              </div>
            ))
          ) : (
            <p>No references provided.</p>
          )}
        </div>

        {/* Footer */}
        <div className="resume-footer">
          <p>© {new Date().getFullYear()} {safeData.personal.name}. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Template1;
