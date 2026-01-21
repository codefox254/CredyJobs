import React from 'react';
import { Box, Typography } from '@mui/material';

function SectionTitle({ children }) {
  return (
    <Box mb={3} mt={2}>
      <Typography variant="h5" fontWeight={700} color="primary.main">
        {children}
      </Typography>
    </Box>
  );
}

export default SectionTitle;
