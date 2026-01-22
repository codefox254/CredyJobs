import React from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Logo from './Logo';

function Navbar() {
  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'linear-gradient(90deg,#d0f5df 0%,#eaffea 100%)', color: '#222', borderBottom: '1px solid #b2dfdb' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Logo />
        </Box>
        <Box>
          <Button color="primary" component={RouterLink} to="/">Jobs</Button>
          <Button color="primary" component={RouterLink} to="/blog">Blog</Button>
          <Button color="primary" component={RouterLink} to="/about">About</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
