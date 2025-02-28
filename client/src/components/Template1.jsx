import React from "react";
import "./ResumeStyles.css";

// Utility function to flatten arrays
const flattenArray = (arr) => (Array.isArray(arr[0]) ? arr[0] : arr);

const Template1 = ({ data = {} }) => {
  console.log("📢 Received Data in Template1:", data);

  // Ensure default values to avoid undefined errors & flatten nested arrays
  const safeData = {
    personal: {
      name: data.personal?.name || "Your Name",
      email: data.personal?.email || "example@email.com",
      phone: data.personal?.phone || "000-000-0000",
      linkedin: data.personal?.linkedin || "",
      github: data.personal?.github || "",
      address: data.personal?.address || "Your Address",
    },
    education: flattenArray(data.education || []),
    experience: flattenArray(data.experience || []),
    skills: flattenArray(data.skills || []),
    projects: flattenArray(data.projects || []),
    certificates: flattenArray(data.certificates || []),
    achievements: flattenArray(data.achievements || []),
    languages: flattenArray(data.languages || []),
    interests: flattenArray(data.interests || []),
    references: flattenArray(data.references || []),
  };

  console.log("✅ Processed Data in Template1:", safeData);

  return (
    <div className="resume-container template1">
      {/* Sidebar */}
      <div className="resume-sidebar">
        <h1>{safeData.personal.name}</h1>
        <p>Email: {safeData.personal.email}</p>
        <p>Phone: {safeData.personal.phone}</p>
        {safeData.personal.linkedin && (
          <p>
            LinkedIn: <a href={safeData.personal.linkedin} target="_blank" rel="noopener noreferrer">{safeData.personal.linkedin}</a>
          </p>
        )}
        {safeData.personal.github && (
          <p>
            GitHub: <a href={safeData.personal.github} target="_blank" rel="noopener noreferrer">{safeData.personal.github}</a>
          </p>
        )}
        <p>Address: {safeData.personal.address}</p>
      </div>

      {/* Main Resume Content */}
      <div className="resume-main">
        {/* Education Section */}
        {safeData.education.length > 0 && (
          <div className="resume-section">
            <h2>Education</h2>
            {safeData.education.map((edu, index) => (
              <div key={index} className="resume-item">
                <h3>{edu.degree} - {edu.college}</h3>
                <p>{edu.startDate} - {edu.endDate} | GPA: {edu.gpa}</p>
              </div>
            ))}
          </div>
        )}

        {/* Experience Section */}
        {safeData.experience.length > 0 && (
          <div className="resume-section">
            <h2>Experience</h2>
            {safeData.experience.map((exp, index) => (
              <div key={index} className="resume-item">
                <h3>{exp.positionTitle} at {exp.companyName}</h3>
                <p>{exp.startDate} - {exp.endDate}</p>
                <p>{exp.description || "No description provided."}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills Section */}
        {safeData.skills.length > 0 && (
          <div className="resume-section">
            <h2>Skills</h2>
            <p>{safeData.skills.join(", ")}</p>
          </div>
        )}

        {/* Projects Section */}
        {safeData.projects.length > 0 && (
          <div className="resume-section">
            <h2>Projects</h2>
            {safeData.projects.map((project, index) => (
              <div key={index} className="resume-item">
                <h3>{project.projectTitle}</h3>
                {project.projectLink && (
                  <a href={project.projectLink} target="_blank" rel="noopener noreferrer">{project.projectLink}</a>
                )}
                <p>{project.description || "No description provided."}</p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications Section */}
        {safeData.certificates.length > 0 && (
          <div className="resume-section">
            <h2>Certifications</h2>
            {safeData.certificates.map((cert, index) => (
              <p key={index}>
                {cert.certificateName}{" "}
                {cert.certificateLink && (
                  <a href={cert.certificateLink} target="_blank" rel="noopener noreferrer">[View Certificate]</a>
                )}
              </p>
            ))}
          </div>
        )}

        {/* Achievements Section */}
        {safeData.achievements.length > 0 && (
          <div className="resume-section">
            <h2>Achievements</h2>
            {safeData.achievements.map((achievement, index) => (
              <p key={index}>
                {achievement.award}{" "}
                {achievement.achievementLink && (
                  <a href={achievement.achievementLink} target="_blank" rel="noopener noreferrer">[View Details]</a>
                )}
              </p>
            ))}
          </div>
        )}

        {/* Languages Section */}
        {safeData.languages.length > 0 && (
          <div className="resume-section">
            <h2>Languages</h2>
            {safeData.languages.map((lang, index) => (
              <p key={index}>{lang.language} - {lang.proficiency}</p>
            ))}
          </div>
        )}

        {/* Interests Section */}
        {safeData.interests.length > 0 && (
          <div className="resume-section">
            <h2>Interests</h2>
            <p>{safeData.interests.join(", ")}</p>
          </div>
        )}

        {/* References Section */}
        {safeData.references.length > 0 && (
          <div className="resume-section">
            <h2>References</h2>
            {safeData.references.map((ref, index) => (
              <p key={index}>
                <strong>{ref.name}:</strong> {ref.jobTitle}, {ref.company}, {ref.email}, {ref.phone}
              </p>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="resume-footer">
          <p>© {new Date().getFullYear()} {safeData.personal.name}. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Template1;
