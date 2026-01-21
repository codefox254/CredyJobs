import React from 'react';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

function BlogDetail() {
  const { id } = useParams();
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Blog Post #{id}</Typography>
      {/* Blog post content will be fetched and displayed here */}
    </Box>
  );
}

export default BlogDetail;
