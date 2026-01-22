import React from 'react';
import { Typography, Box } from '@mui/material';
import BlogList from '../components/BlogList';

function Blog() {
  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', px: 0, py: 0, bgcolor: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Box sx={{
        width: '100%',
        maxWidth: 1500,
        mx: 'auto',
        mt: 4,
        mb: 4,
        bgcolor: '#fff',
        borderRadius: 4,
        boxShadow: '0 8px 32px 0 rgba(60,72,88,0.12)',
        border: '1px solid #e0e0e0',
        px: { xs: 1, sm: 3, md: 6 },
        py: 4,
      }}>
        <Box sx={{ mb: 4, textAlign: 'center', py: 2, borderRadius: 3, bgcolor: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)', color: '#fff', boxShadow: 2 }}>
          <Typography variant="h3" fontWeight={800} sx={{ letterSpacing: 1, mb: 1 }}>Career Blog</Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>Read the latest career tips, job search strategies, and industry news from our career coaches.</Typography>
        </Box>
        <BlogList />
      </Box>
    </Box>
  );
}

export default Blog;
