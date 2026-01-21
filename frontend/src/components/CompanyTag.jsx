import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

function CompanyTag({ company }) {
  return (
    <Chip label={company} color="primary" sx={{ fontWeight: 600, fontSize: 14, mr: 1 }} />
  );
}

export default CompanyTag;
