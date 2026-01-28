import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function BlogCard({ blog }) {
  return (
    <Card sx={{
      mb: 2,
      borderRadius: 5,
      boxShadow: '0 8px 32px 0 rgba(30,185,84,0.10)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      border: '2px solid #1db954',
      transition: 'box-shadow 0.2s, border-color 0.2s',
      '&:hover': {
        boxShadow: '0 16px 48px 0 #1976d2cc',
        borderColor: '#1976d2',
        transform: 'scale(1.03) rotate(-1deg)',
      },
      background: 'linear-gradient(120deg, #fff 60%, #e3e9f7 100%)',
    }}>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" component={RouterLink} to={`/blog/${blog.id}`} sx={{ textDecoration: 'none', color: 'primary.main', cursor: 'pointer', fontWeight: 800, mb: 1, fontSize: 22, letterSpacing: 1 }}>
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
          {new Date(blog.posted_at).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, color: '#333', fontWeight: 500, fontSize: 16 }}>
          {blog.content.slice(0, 120)}{blog.content.length > 120 ? '...' : ''}
        </Typography>
      </CardContent>
      <Box textAlign="right" sx={{ p: 2 }}>
        <Typography variant="caption" color="secondary" component={RouterLink} to={`/blog/${blog.id}`}
          sx={{ textDecoration: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 15 }}>
          Read More
        </Typography>
      </Box>
    </Card>
  );
}

export default BlogCard;
