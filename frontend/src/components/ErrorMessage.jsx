import React from 'react';
import { Box, Typography } from '@mui/material';

function ErrorMessage({ message }) {
  return (
    <Box my={4} textAlign="center">
      <Typography variant="body1" color="error">
        {message}
      </Typography>
    </Box>
  );
}

export default ErrorMessage;
