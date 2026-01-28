import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { CircularProgress, Typography, Box } from '@mui/material';
import axios from 'axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/blogposts/')
      .then(res => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load blog posts.');
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (blogs.length === 0) return <Typography>No blog posts found.</Typography>;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: '1fr 1fr 1fr',
          lg: '1fr 1fr 1fr 1fr'
        },
        gap: 4,
        width: '100%',
        mt: 2,
        mb: 2,
        p: 1,
      }}
    >
      {blogs.map(blog => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </Box>
  );
}

export default BlogList;
