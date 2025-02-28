import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import resumeImg from '../assets/resume_1.png'
const Intro = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); 

  const handleClick = () => {
    if (isAuthenticated) {
      navigate("/personal");
    } else {
      navigate("/signup");
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ flex: 1 ,marginLeft:"3em"}}>
        <h1 style={{ color: "#FF7F50" ,fontFamily:"serif"}}>Craft Your Perfect Resume with ResumeWizard</h1>
        <h3 >Elevate your career journey with tailored resumes that shine bright.</h3>
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            bgcolor: '#640D6B',
            '&:hover': { bgcolor: '#640D6B' },
            marginLeft:"2em"
          }}
        >
          Start
        </Button>
      </div>
      <div >
        <img src={resumeImg} alt="resume" style={{ maxWidth: '100%', height: 'auto',overflow:'hidden' }} />
      </div>
    </div>
  )
}

export default Intro