
import React from 'react';
import { Typography, Box, Paper, Divider, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import WorkIcon from '@mui/icons-material/Work';
import Logo from '../components/Logo';
import { Link as RouterLink } from 'react-router-dom';

function About() {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, mb: 4, bgcolor: '#f8fafc' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Logo />
          <Typography variant="h4" fontWeight={700} color="primary.main">About CredyJobs</Typography>
        </Box>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Your gateway to a brighter career.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" sx={{ mb: 2 }}>
          CredyJobs is a modern, user-friendly platform connecting job seekers with top opportunities. Our mission is to make job discovery and application seamless, transparent, and effective.
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
            <ListItemText primary="Browse hundreds of curated jobs from top companies." />
          </ListItem>
          <ListItem>
            <ListItemIcon><SearchIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Search and filter jobs by title, company, or location." />
          </ListItem>
          <ListItem>
            <ListItemIcon><WorkIcon color="secondary" /></ListItemIcon>
            <ListItemText primary="Apply directly and track your applications easily." />
          </ListItem>
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
          How to use CredyJobs:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon><InfoIcon color="info" /></ListItemIcon>
            <ListItemText primary="Use the search bar on the home page to find jobs that match your skills." />
          </ListItem>
          <ListItem>
            <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
            <ListItemText primary="Click on a job card to view details and apply." />
          </ListItem>
          <ListItem>
            <ListItemIcon><WorkIcon color="secondary" /></ListItemIcon>
            <ListItemText primary="Bookmark or share jobs with friends using the share button." />
          </ListItem>
        </List>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
            Explore our Career Blog
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Get the latest career tips, job search strategies, and industry news.
          </Typography>
          <Button variant="contained" color="primary" component={RouterLink} to="/blog">
            Visit Blog
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default About;
