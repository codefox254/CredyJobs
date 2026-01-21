import React from 'react';
import { Box, Typography } from '@mui/material';

function PageHeader({ title, subtitle }) {
  return (
    <Box mb={4} mt={2}>
      <Typography variant="h3" fontWeight={800} color="primary.main" gutterBottom>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="h6" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

export default PageHeader;
