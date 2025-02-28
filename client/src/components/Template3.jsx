import React from "react";
import "./ResumeStyles.css"; // Import CSS for styling

const Template3 = ({ data }) => {
  if (!data) return <p>No Data Available</p>;

  return (
    <div className="resume-container">
      {/* Header Section */}
      <div className="resume-header">
        <h1>{data.personal?.name || "Your Name"}</h1>
        <p>
          {data.personal?.email || "your.email@example.com"} | {data.personal?.phone || "123-456-7890"}
        </p>
      </div>

      {/* Sidebar for Summary */}
      {data.personal?.summary && (
        <div className="resume-sidebar">
          <p>{data.personal.summary}</p>
        </div>
      )}

      {/* Education Section */}
      {data.education?.length > 0 && (
        <div className="resume-section">
          <h2>Education</h2>
          {data.education[0].map((edu, index) => (
            <div key={index} className="education-item">
              <h3>
                {edu.degree} - {edu.college}
              </h3>
              <p className="resume-date">
                {edu.startDate} - {edu.endDate || "Present"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Experience Section */}
      {data.experience?.length > 0 && (
        <div className="resume-section">
          <h2>Experience</h2>
          {data.experience[0].map((exp, index) => (
            <div key={index} className="experience-item">
              <h3>
                {exp.positionTitle} - {exp.companyName}
              </h3>
              <p className="resume-date">
                {exp.startDate} - {exp.endDate || "Present"}
              </p>
              <p>{exp.description || "No description provided"}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects Section */}
      {data.projects?.length > 0 && (
        <div className="resume-section">
          <h2>Projects</h2>
          {data.projects[0].map((proj, index) => (
            <div key={index} className="project-item">
              <h3>{proj.projectTitle}</h3>
              <p>{proj.description || "No description provided"}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {data.skills?.length > 0 && (
        <div className="resume-section">
          <h2>Skills</h2>
          <div className="skills-list">
            {data.skills.map((skill, index) => (
              <span key={index} className="skill-badge">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages Section */}
      {data.languages?.length > 0 && (
        <div className="resume-section">
          <h2>Languages</h2>
          <div className="language-list">
            {data.languages[0].map((lang, index) => (
              <span key={index}>
                {lang.language} - {lang.proficiency}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Interests Section */}
      {data.interests?.length > 0 && (
        <div className="resume-section">
          <h2>Interests</h2>
          <div className="interest-list">
            {data.interests[0].map((interest, index) => (
              <span key={index}>{interest}</span>
            ))}
          </div>
        </div>
      )}

      {/* References Section */}
      {data.references?.length > 0 && (
        <div className="resume-section">
          <h2>References</h2>
          <div className="references-list">
            {data.references[0].map((ref, index) => (
              <p key={index}>
                <strong>{ref.name}</strong> - {ref.jobTitle} at {ref.company} ({ref.email} | {ref.phone})
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Template3;