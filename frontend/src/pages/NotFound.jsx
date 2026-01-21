import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function NotFound() {
  return (
    <Box textAlign="center" mt={8}>
      <Typography variant="h2" color="primary" gutterBottom>404</Typography>
      <Typography variant="h5" gutterBottom>Page Not Found</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Go Home
      </Button>
    </Box>
  );
}

export default NotFound;
