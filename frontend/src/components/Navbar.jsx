import React from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Logo from './Logo';

function Navbar() {
  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#23272f', color: '#fff', borderBottom: '1px solid #333' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Logo />
        </Box>
        <Box>
          <Button color="secondary" component={RouterLink} to="/">Jobs</Button>
          <Button color="secondary" component={RouterLink} to="/blog">Blog</Button>
          <Button color="secondary" component={RouterLink} to="/about">About</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
