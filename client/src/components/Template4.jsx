import React from "react";
import "./ResumeStyles.css"; // Import CSS for styling

const Template4 = ({ data, aiSummary }) => {
  if (!data) return <p>No Data Available</p>;

  return (
    <div className="resume-template-4">
      {/* Sidebar Section */}
      <div className="resume-sidebar">
        {data.personal?.photo && (
          <img
            src={data.personal.photo}
            alt="Profile"
            className="resume-photo"
            onError={(e) => {
              console.error("❌ Image failed to load:", e.target.src);
              e.target.onerror = null;
              e.target.src = "/default-profile.png";
            }}
          />
        )}
        <h1>{data.personal?.name || "Your Name"}</h1>
        <p>{data.personal?.email || "your.email@example.com"}</p>
        <p>{data.personal?.phone || "123-456-7890"}</p>

        {/* Skills Section */}
        {Array.isArray(data.skills) && data.skills.length > 0 && (
          <div className="resume-section">
            <h2>Skills</h2>
            <ul className="resume-list">
              {data.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages Section */}
        {Array.isArray(data.languages) && data.languages.length > 0 && (
          <div className="resume-section">
            <h2>Languages</h2>
            <ul className="resume-list">
              {data.languages.flat().map((lang, index) => (
                <li key={index}>{lang.language} - {lang.proficiency}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Interests Section */}
        {Array.isArray(data.interests) && data.interests.length > 0 && (
          <div className="resume-section">
            <h2>Interests</h2>
            <ul className="resume-list">
              {data.interests.flat().map((interest, index) => (
                <li key={index}>{interest.interest || interest}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content Section */}
      <div className="resume-main">
        {/* AI Summary Section */}
        {aiSummary && (
          <div className="resume-section ai-summary">
            <h2>Description</h2>
            <p>{aiSummary}</p>
          </div>
        )}

        {/* Education Section */}
        {Array.isArray(data.education) && data.education.length > 0 && (
          <div className="resume-section">
            <h2>Education</h2>
            {data.education.flat().map((edu, index) => (
              <div key={index} className="resume-item">
                <h3>{edu.degree} - {edu.college}</h3>
                <p className="resume-date">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {/* Experience Section */}
        {Array.isArray(data.experience) && data.experience.length > 0 && (
          <div className="resume-section">
            <h2>Experience</h2>
            {data.experience.flat().map((exp, index) => (
              <div key={index} className="resume-item">
                <h3>{exp.positionTitle} - {exp.companyName}</h3>
                <p className="resume-date">{exp.startDate} - {exp.endDate || "Present"}</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Projects Section */}
        {Array.isArray(data.projects) && data.projects.length > 0 && (
          <div className="resume-section">
            <h2>Projects</h2>
            {data.projects.flat().map((proj, index) => (
              <div key={index} className="resume-item">
                <h3>{proj.projectTitle}</h3>
                <p><a href={proj.projectLink} target="_blank" rel="noopener noreferrer">{proj.projectLink}</a></p>
                <p>{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications Section */}
        {Array.isArray(data.certificates) && data.certificates.length > 0 && (
          <div className="resume-section">
            <h2>Certifications</h2>
            {data.certificates.flat().map((cert, index) => (
              <div key={index} className="resume-item">
                <h3>{cert.certificateName}</h3>
                <p><a href={cert.certificateLink} target="_blank" rel="noopener noreferrer">{cert.certificateLink}</a></p>
              </div>
            ))}
          </div>
        )}

        {/* Achievements Section */}
        {Array.isArray(data.achievements) && data.achievements.length > 0 && (
          <div className="resume-section">
            <h2>Achievements</h2>
            {data.achievements.flat().map((ach, index) => (
              <div key={index} className="resume-item">
                <h3>{ach.award}</h3>
                <p><a href={ach.achievementLink} target="_blank" rel="noopener noreferrer">{ach.achievementLink}</a></p>
              </div>
            ))}
          </div>
        )}

        {/* References Section */}
        {Array.isArray(data.references) && data.references.length > 0 && (
          <div className="resume-section">
            <h2>References</h2>
            {data.references.flat().map((ref, index) => (
              <div key={index} className="resume-item">
                <strong>{ref.name}</strong>
                <p>{ref.jobTitle} at {ref.company}</p>
                <p>Email: {ref.email}</p>
                <p>Phone: {ref.phone}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Template4;
