import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { CircularProgress, Typography } from '@mui/material';
import axios from 'axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/blogposts/')
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
    <div>
      {blogs.map(blog => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default BlogList;
