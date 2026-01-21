import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

function DateTag({ date }) {
  return (
    <Chip label={new Date(date).toLocaleDateString()} sx={{ fontSize: 13, background: '#e0e0e0', color: '#333', mr: 1 }} />
  );
}

export default DateTag;
