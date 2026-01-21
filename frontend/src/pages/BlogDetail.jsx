import React from 'react';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import BlogDetailContent from '../components/BlogDetailContent';

function BlogDetail() {
  const { id } = useParams();
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Blog Post #{id}</Typography>
      <BlogDetailContent />
    </Box>
  );
}

export default BlogDetail;
