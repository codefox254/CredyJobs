import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

function JobDetailCard({ job }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 4, mt: 2 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>{job.title}</Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
          {job.company} • {job.location}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-line' }}>{job.description}</Typography>
        <Box textAlign="right">
          <Button variant="contained" color="secondary" href={job.apply_url} target="_blank" rel="noopener noreferrer">
            Apply Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default JobDetailCard;
