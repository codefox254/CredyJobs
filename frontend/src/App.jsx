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
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#181818' }}>
        <Sidebar />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <Container maxWidth="md" sx={{ mt: 4, flex: 1, bgcolor: '#23272f', borderRadius: 3, boxShadow: 2, p: 3 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/job/:id" element={<JobDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
          <Footer />
        </Box>
      </Box>
    </Router>
  );
}

export default App;
