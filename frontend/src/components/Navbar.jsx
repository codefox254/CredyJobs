import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          CredyJobs
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">Jobs</Button>
          <Button color="inherit" component={RouterLink} to="/blog">Blog</Button>
          <Button color="inherit" component={RouterLink} to="/about">About</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
