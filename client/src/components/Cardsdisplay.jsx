import React from 'react'
import Cardsection from './Cardsection'
import { Grid } from '@mui/material'
import authImg from '../assets/auth.png'
import formImg from "../assets/form-filling.jpg"
import pdfImg from "../assets/pdfimg.png"
const Cardsdisplay = () => {
  return (
    <div>
      <h2 style={{textAlign:"center",fontSize:"2em",marginTop:"2em", color:"#FF7F50"}}>3 steps to a perfect resume</h2>
       <Grid container spacing={2} >
      <Grid item xs={12} sm={6} md={4}>
        <Cardsection title="User Authentication" c="1" description="Make sure to signup or login in the website." source={authImg} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Cardsection title="Fill the details" c="2" description="Give the necessary details to create a customized resume." source={formImg}/>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Cardsection title="Download Resume" c="3" description="Feel free to download the resume in pdf format." source= {pdfImg}/>
        </Grid>
        </Grid>
    </div>
    
  )
}

export default Cardsdisplay