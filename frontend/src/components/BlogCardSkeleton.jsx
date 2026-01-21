import React from 'react';
import { Box, Skeleton } from '@mui/material';

function BlogCardSkeleton() {
  return (
    <Box mb={2}>
      <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 3 }} />
    </Box>
  );
}

export default BlogCardSkeleton;
