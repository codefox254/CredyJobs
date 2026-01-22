import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function BlogCard({ blog }) {
  return (
    <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" component={RouterLink} to={`/blog/${blog.id}`} sx={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {new Date(blog.posted_at).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {blog.content.slice(0, 120)}{blog.content.length > 120 ? '...' : ''}
        </Typography>
      </CardContent>
      <Box textAlign="right" sx={{ p: 2 }}>
        <Typography variant="caption" color="primary" component={RouterLink} to={`/blog/${blog.id}`}
          sx={{ textDecoration: 'none', cursor: 'pointer' }}>
          Read More
        </Typography>
      </Box>
    </Card>
  );
}

export default BlogCard;
