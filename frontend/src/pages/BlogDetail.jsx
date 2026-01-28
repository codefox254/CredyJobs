import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Container } from '@mui/material';
import BlogDetailContent from '../components/BlogDetailContent';
import BlogReactions from '../components/BlogReactions';
import BlogComments from '../components/BlogComments';
import BlogShareBar from '../components/BlogShareBar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BlogDetail() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [blog, setBlog] = useState(null);
  const [loadingComments, setLoadingComments] = useState(false);

  // Fetch comments for this blog post
  useEffect(() => {
    if (!id) return;
    setLoadingComments(true);
    axios.get(`http://127.0.0.1:8000/api/comments/?blog=${id}`)
      .then(res => setComments(res.data))
      .catch(() => setComments([]))
      .finally(() => setLoadingComments(false));
  }, [id]);

  // BlogDetailContent will call this when loaded
  const handleBlogLoaded = (data) => setBlog(data);

  // Add a comment to backend and update state
  const handleAddComment = (comment) => {
    axios.post('http://127.0.0.1:8000/api/comments/', {
      ...comment,
      blog: id
    }).then(res => {
      setComments(prev => [...prev, res.data]);
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={6} sx={{ borderRadius: 6, p: { xs: 2, sm: 4 }, boxShadow: '0 12px 40px 0 rgba(30,185,84,0.10)', border: '2px solid #1db954', background: 'linear-gradient(120deg, #fff 60%, #e3e9f7 100%)' }}>
        <BlogDetailContent onLoaded={handleBlogLoaded} />
        <BlogReactions />
        <BlogShareBar blog={blog} />
        <BlogComments comments={comments} onAdd={handleAddComment} loading={loadingComments} />
      </Paper>
    </Container>
  );
}

export default BlogDetail;
