import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import About from './pages/About';
import { Container, Box } from '@mui/material';
import Footer from './components/Footer';
import JobDetail from './pages/JobDetail';
import NotFound from './pages/NotFound';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh', width: '100vw', bgcolor: 'background.default' }}>
        <Sidebar />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <Navbar />
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0, bgcolor: 'transparent', p: 0 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/job/:id" element={<JobDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Box>
    </Router>
  );
}

export default App;
