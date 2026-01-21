import React from 'react';
import { Box, Typography } from '@mui/material';

function LoadingOverlay({ message }) {
  return (
    <Box position="fixed" top={0} left={0} width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="rgba(255,255,255,0.7)" zIndex={2000}>
      <Typography variant="h6" color="primary">
        {message || 'Loading...'}
      </Typography>
    </Box>
  );
}

export default LoadingOverlay;
