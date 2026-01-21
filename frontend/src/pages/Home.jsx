import React from 'react';
import { Typography, Box } from '@mui/material';

function Home() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Find Your Next Opportunity</Typography>
      {/* JobList will be added here */}
      <Typography variant="body1" color="text.secondary">Browse the latest jobs and apply directly to recruiters.</Typography>
    </Box>
  );
}

export default Home;
