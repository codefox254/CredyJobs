import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, CircularProgress, Chip } from '@mui/material';
import axios from 'axios';

function BlogDetailContent({ onLoaded }) {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/blogposts/${id}/`)
      .then(res => {
        setBlog(res.data);
        setLoading(false);
        if (onLoaded) onLoaded(res.data);
      })
      .catch(() => {
        setError('Blog post not found.');
        setLoading(false);
      });
  }, [id, onLoaded]);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!blog) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h3" fontWeight={900} color="primary" gutterBottom sx={{ letterSpacing: 1 }}>{blog.title}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {new Date(blog.posted_at).toLocaleDateString()}
        </Typography>
        <Chip label="Career Advice" color="secondary" size="small" />
      </Box>
      {blog.image && <img src={blog.image} alt={blog.title} style={{ maxWidth: '100%', borderRadius: 10, marginBottom: 18, boxShadow: '0 4px 18px #1db95433' }} />}
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line', fontSize: 18, color: '#222', fontWeight: 500 }}>{blog.content}</Typography>
    </Box>
  );
}

export default BlogDetailContent;
