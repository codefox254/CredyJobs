import React from 'react';
import { Typography, Box } from '@mui/material';
import BlogList from '../components/BlogList';

function Blog() {
  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', px: 0, py: 0, bgcolor: 'linear-gradient(120deg, #f8fafc 0%, #e3e9f7 100%)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Box sx={{
        width: '100%',
        maxWidth: 1500,
        mx: 'auto',
        mt: 4,
        mb: 4,
        bgcolor: '#fff',
        borderRadius: 6,
        boxShadow: '0 12px 40px 0 rgba(30,185,84,0.10)',
        border: '2px solid #1db954',
        px: { xs: 1, sm: 4, md: 8 },
        py: 6,
        position: 'relative',
      }}>
        <Box sx={{
          mb: 5,
          textAlign: 'center',
          py: 3,
          borderRadius: 4,
          background: 'linear-gradient(90deg, #1db954 0%, #1976d2 100%)',
          color: '#fff',
          boxShadow: '0 4px 24px 0 #1db95433',
          border: '2px solid #fff',
          position: 'relative',
        }}>
          <Typography variant="h2" fontWeight={900} sx={{ letterSpacing: 2, mb: 1, textShadow: '0 2px 8px #1976d2' }}>Career Blog</Typography>
          <Typography variant="h5" sx={{ opacity: 0.93, fontWeight: 500 }}>Read the latest career tips, job search strategies, and industry news from our career coaches.</Typography>
        </Box>
        <BlogList />
      </Box>
    </Box>
  );
}

export default Blog;
