import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function JobCard({ job }) {
  return (
    <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" component={RouterLink} to={`/job/${job.id}`} sx={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
              {job.title}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">{job.company} • {job.location}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>{job.description}</Typography>
          </Box>
          <Button variant="contained" color="secondary" href={job.apply_url} target="_blank" rel="noopener noreferrer">
            Apply
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default JobCard;
