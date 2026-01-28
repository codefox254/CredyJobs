import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';


function BlogComments({ comments, onAdd, loading }) {
  const [text, setText] = useState('');
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (text.trim() && name.trim()) {
      onAdd({ name, text });
      setText('');
      setName('');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight={700} mb={2}>Comments</Typography>
      <List sx={{ mb: 2 }}>
        {loading ? (
          <Typography color="text.secondary">Loading comments...</Typography>
        ) : comments.length === 0 ? (
          <Typography color="text.secondary">No comments yet. Be the first!</Typography>
        ) : comments.map((c, i) => (
          <ListItem key={i} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>{c.name[0]?.toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<span style={{ fontWeight: 700 }}>{c.name}</span>}
              secondary={<>
                <span style={{ color: '#888', fontSize: 13 }}>{new Date(c.date).toLocaleString()}</span><br />
                {c.text}
              </>}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
        <TextField label="Name" value={name} onChange={e => setName(e.target.value)} size="small" sx={{ flex: 1 }} />
        <TextField label="Add a comment..." value={text} onChange={e => setText(e.target.value)} size="small" sx={{ flex: 3 }} />
        <Button variant="contained" color="secondary" onClick={handleAdd} sx={{ fontWeight: 700 }}>Post</Button>
      </Box>
    </Box>
  );
}

export default BlogComments;
