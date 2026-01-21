import React from 'react';
import { Box, Typography, Skeleton } from '@mui/material';

function JobCardSkeleton() {
  return (
    <Box mb={2}>
      <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 3 }} />
    </Box>
  );
}

export default JobCardSkeleton;
