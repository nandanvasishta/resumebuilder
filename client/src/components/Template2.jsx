import React from "react";
import "./ResumeStyles.css"; // Import the CSS file

const Template2 = ({ data }) => {
  return (
    <div className="resume-container">
      {/* Header Section */}
      <div className="resume-header">
        <h1>{data.personal?.name || "Your Name"}</h1>
        <p>{data.personal?.email || "your.email@example.com"} | {data.personal?.phone || "123-456-7890"}</p>
      </div>

      {/* Sidebar Section */}
      <div className="resume-sidebar">
        <h2>Contact Info</h2>
        <p>{data.personal?.address || "Your Address"}</p>
        <p>{data.personal?.linkedin && <a href={data.personal.linkedin}>LinkedIn</a>}</p>
        <p>{data.personal?.github && <a href={data.personal.github}>GitHub</a>}</p>
      </div>

      {/* Experience Section */}
      {data.experience?.length > 0 && (
        <div className="resume-section">
          <h2>Experience</h2>
          {data.experience[0].map((exp, index) => (
            <div key={index} className="resume-item">
              <h3>{exp.positionTitle} - {exp.companyName}</h3>
              <p className="resume-date">{exp.startDate} - {exp.endDate || "Present"}</p>
              <p>{exp.description || "No description provided"}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education Section */}
      {data.education?.length > 0 && (
        <div className="resume-section">
          <h2>Education</h2>
          {data.education[0].map((edu, index) => (
            <div key={index} className="resume-item">
              <h3>{edu.degree} - {edu.college}</h3>
              <p className="resume-date">{edu.startDate} - {edu.endDate || "Present"}</p>
              <p>GPA: {edu.gpa || "N/A"}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects Section */}
      {data.projects?.length > 0 && (
        <div className="resume-section">
          <h2>Projects</h2>
          {data.projects[0].map((proj, index) => (
            <div key={index} className="resume-item">
              <h3>{proj.projectTitle}</h3>
              <p>{proj.description || "No description provided"}</p>
              {proj.projectLink && <a href={proj.projectLink}>Project Link</a>}
            </div>
          ))}
        </div>
      )}

      {/* Certificates Section */}
      {data.certificates?.length > 0 && (
        <div className="resume-section">
          <h2>Certificates</h2>
          {data.certificates[0].map((cert, index) => (
            <div key={index} className="resume-item">
              <h3>{cert.certificateName}</h3>
              {cert.certificateLink && <a href={cert.certificateLink}>Certificate Link</a>}
            </div>
          ))}
        </div>
      )}

      {/* Achievements Section */}
      {data.achievements?.length > 0 && (
        <div className="resume-section">
          <h2>Achievements</h2>
          {data.achievements[0].map((achieve, index) => (
            <div key={index} className="resume-item">
              <h3>{achieve.award}</h3>
              {achieve.achievementLink && <a href={achieve.achievementLink}>Achievement Link</a>}
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
              <span key={index} className="skill-badge">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Languages Section */}
      {data.languages?.length > 0 && (
        <div className="resume-section">
          <h2>Languages</h2>
          <div className="skills-list">
            {data.languages[0].map((lang, index) => (
              <span key={index} className="skill-badge">{lang.language} ({lang.proficiency})</span>
            ))}
          </div>
        </div>
      )}

      {/* Interests Section */}
      {data.interests?.length > 0 && (
        <div className="resume-section">
          <h2>Interests</h2>
          <div className="skills-list">
            {data.interests[0].map((interest, index) => (
              <span key={index} className="skill-badge">{interest}</span>
            ))}
          </div>
        </div>
      )}

      {/* References Section */}
      {data.references?.length > 0 && (
        <div className="resume-section">
          <h2>References</h2>
          {data.references[0].map((ref, index) => (
            <div key={index} className="resume-item">
              <p><strong>{ref.name}</strong> - {ref.jobTitle} at {ref.company}</p>
              <p>{ref.email} | {ref.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Template2;
