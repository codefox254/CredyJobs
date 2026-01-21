import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Divider } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';

const drawerWidth = 220;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: '#181818', color: '#fff' },
      }}
    >
      <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
        <HomeIcon sx={{ fontSize: 40, color: 'primary.main' }} />
      </Box>
      <Divider sx={{ bgcolor: '#333' }} />
      <List>
        <ListItem button component={RouterLink} to="/">
          <ListItemIcon sx={{ color: '#fff' }}><WorkIcon /></ListItemIcon>
          <ListItemText primary="Jobs" />
        </ListItem>
        <ListItem button component={RouterLink} to="/blog">
          <ListItemIcon sx={{ color: '#fff' }}><ArticleIcon /></ListItemIcon>
          <ListItemText primary="Blog" />
        </ListItem>
        <ListItem button component={RouterLink} to="/about">
          <ListItemIcon sx={{ color: '#fff' }}><InfoIcon /></ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
