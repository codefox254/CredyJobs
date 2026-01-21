import React from 'react';
import { Box, Typography } from '@mui/material';

function Logo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ width: 32, height: 32, bgcolor: 'primary.main', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" color="white" fontWeight={700}>
          C
        </Typography>
      </Box>
      <Typography variant="h6" color="primary.main" fontWeight={700}>
        CredyJobs
      </Typography>
    </Box>
  );
}

export default Logo;
