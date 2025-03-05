import React from "react";
import "./ResumeStyles.css"; // Import CSS for styling

const Template5 = ({ data, aiSummary }) => {
  if (!data) return <p>No Data Available</p>;

  return (
    <div className="resume-template-5">
      <img
        src={data.personal?.photo}
        alt="Profile"
        className="resume-photo"
        onError={(e) => {
          console.error("❌ Image failed to load:", e.target.src);
          e.target.onerror = null;
          e.target.src = "/default-profile.png";
        }}
      />
      <h1 className="resume-header">{data.personal?.name || "Your Name"}</h1>
      <p className="resume-contact">
        <a href={`mailto:${data.personal?.email || "your.email@example.com"}`}>
          {data.personal?.email || "your.email@example.com"}
        </a>{" "}|{" "}
        <a href={`tel:${data.personal?.phone || "123-456-7890"}`}>
          {data.personal?.phone || "123-456-7890"}
        </a>
      </p>

      {/* AI Summary Section */}
      {aiSummary && (
        <div className="resume-section ai-summary">
          <h2>Description</h2>
          <p>{aiSummary}</p>
        </div>
      )}

      {/* Experience Section */}
      {Array.isArray(data.experience) && data.experience.length > 0 && (
        <div className="resume-section">
          <h2>Experience</h2>
          {data.experience.flat().map((exp, index) => (
            <div key={index} className="resume-item">
              <strong>{exp.positionTitle} - {exp.companyName}</strong>
              <p className="resume-date">{exp.startDate} - {exp.endDate || "Present"}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education Section */}
      {Array.isArray(data.education) && data.education.length > 0 && (
        <div className="resume-section">
          <h2>Education</h2>
          {data.education.flat().map((edu, index) => (
            <div key={index} className="resume-item">
              <strong>{edu.degree}</strong> - {edu.college}
              <p className="resume-date">{edu.startDate} - {edu.endDate}</p>
            </div>
          ))}
        </div>
      )}

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

      {/* Projects Section */}
      {Array.isArray(data.projects) && data.projects.length > 0 && (
        <div className="resume-section">
          <h2>Projects</h2>
          {data.projects.flat().map((proj, index) => (
            <div key={index} className="resume-item">
              <h3>{proj.projectTitle}</h3>
              <p>
                <a href={proj.projectLink} target="_blank" rel="noopener noreferrer">
                  {proj.projectLink}
                </a>
              </p>
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
              <p>
                <a href={cert.certificateLink} target="_blank" rel="noopener noreferrer">
                  {cert.certificateLink}
                </a>
              </p>
            </div>
          ))}
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
              <li key={index}>{typeof interest === "string" ? interest : interest.interest}</li>
            ))}
          </ul>
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
              <p>Email: <a href={`mailto:${ref.email}`}>{ref.email}</a></p>
              <p>Phone: <a href={`tel:${ref.phone}`}>{ref.phone}</a></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Template5;
