import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

function BlogDetailContent() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      axios.get(`/api/blogposts/${id}/`)
      .then(res => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Blog post not found.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!blog) return null;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{blog.title}</Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
        {new Date(blog.posted_at).toLocaleDateString()}
      </Typography>
      {blog.image && <img src={blog.image} alt={blog.title} style={{ maxWidth: '100%', borderRadius: 8, marginBottom: 16 }} />}
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>{blog.content}</Typography>
    </Box>
  );
}

export default BlogDetailContent;
