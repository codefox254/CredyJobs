import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function EmptyState({ message, actionText, actionHref }) {
  return (
    <Box textAlign="center" mt={6}>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {message}
      </Typography>
      {actionText && actionHref && (
        <Button variant="contained" color="primary" href={actionHref} sx={{ mt: 2 }}>
          {actionText}
        </Button>
      )}
    </Box>
  );
}

export default EmptyState;
