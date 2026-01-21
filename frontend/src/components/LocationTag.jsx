import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

function LocationTag({ location }) {
  return (
    <Chip label={location} color="secondary" sx={{ fontWeight: 600, fontSize: 14, mr: 1 }} />
  );
}

export default LocationTag;
