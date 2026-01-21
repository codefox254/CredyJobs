import React from 'react';
import { Typography, Box } from '@mui/material';

function Blog() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Career Blog</Typography>
      {/* BlogList will be added here */}
      <Typography variant="body1" color="text.secondary">Read the latest career tips and industry news.</Typography>
    </Box>
  );
}

export default Blog;
