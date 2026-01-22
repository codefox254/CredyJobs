import React from 'react';
import { Box, Typography } from '@mui/material';

function Logo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={process.env.PUBLIC_URL + '/logo.jpg'}
          alt="CredyJobs Logo"
          style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}
        />
      </Box>
      <Typography variant="h6" color="primary.main" fontWeight={700}>
        CredyJobs
      </Typography>
    </Box>
  );
}

export default Logo;
