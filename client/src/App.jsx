import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Personal from "./components/categories/Personal";
import Education from "./components/categories/Education";
import Experience from "./components/categories/Experience";
import Skills from "./components/categories/Skills";
import Projects from "./components/categories/Projects";
import Certificates from "./components/categories/Certificates";
import Achievements from "./components/categories/Achievements";
import Resume from './components/Resume';
import Logout from './components/Logout';
import Languages from './components/categories/Languages';
import References from './components/categories/References';
import Interests from './components/categories/Interests';
import ResumeOptimizer from './components/ResumeOptimizer'; // ✅ Added AI Optimizer

function App() {
  return (  
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/education" element={<Education />} />
          <Route path='/experience' element={<Experience />} />
          <Route path='/skills' element={<Skills />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/certify' element={<Certificates />} />
          <Route path='/achieve' element={<Achievements />} />
          <Route path='/resume' element={<Resume />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/languages' element={<Languages />} />
          <Route path='/references' element={<References />} />
          <Route path='/interests' element={<Interests />} />
          <Route path='/resume-optimizer' element={<ResumeOptimizer />} /> {/* ✅ New Route */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
