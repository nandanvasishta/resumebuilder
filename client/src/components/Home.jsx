
import React from 'react'
import Navbar from './Navbar';
import Intro from "./Intro";
import Cardsdisplay from './Cardsdisplay';
import Footer from './Footer';
const Home = () => {
  return (
    <div>
      <Navbar />
      <Intro />
      <Cardsdisplay />
      <Footer />
    </div>
  )
}

export default Home