import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Divider } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';
import Logo from './Logo';
import { Link as RouterLink } from 'react-router-dom';

const drawerWidth = 220;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#1db954',
          color: '#fff',
        },
      }}
    >
      <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
        <Logo />
      </Box>
      <Divider sx={{ bgcolor: 'grey.300' }} />
      <List>
        <ListItem button component={RouterLink} to="/">
          <ListItemIcon sx={{ color: '#fff' }}><WorkIcon /></ListItemIcon>
          <ListItemText primary="Jobs" sx={{ color: '#fff' }} />
        </ListItem>
        <ListItem button component={RouterLink} to="/blog">
          <ListItemIcon sx={{ color: '#fff' }}><ArticleIcon /></ListItemIcon>
          <ListItemText primary="Blog" sx={{ color: '#fff' }} />
        </ListItem>
        <ListItem button component={RouterLink} to="/about">
          <ListItemIcon sx={{ color: '#fff' }}><InfoIcon /></ListItemIcon>
          <ListItemText primary="About" sx={{ color: '#fff' }} />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
