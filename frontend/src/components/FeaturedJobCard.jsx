import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip, Fade, IconButton, Tooltip } from '@mui/material';
import CompanyTag from './CompanyTag';
import LocationTag from './LocationTag';
import DateTag from './DateTag';
import WorkIcon from '@mui/icons-material/Work';
import ShareIcon from '@mui/icons-material/Share';
import { keyframes } from '@emotion/react';

const bounce = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`;

function copyShareLink(jobId) {
  const url = `${window.location.origin}/job/${jobId}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      alert('Job link copied! Share it anywhere.');
    }, () => {
      window.prompt('Copy this job link:', url);
    });
  } else {
    window.prompt('Copy this job link:', url);
  }
}

function FeaturedJobCard({ job }) {
  return (
    <Fade in timeout={800}>
      <Card sx={{ mb: 4, borderRadius: 4, boxShadow: 6, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, bgcolor: 'background.paper', color: 'text.primary', position: 'relative', overflow: 'hidden' }}>
        {job.image && (
          <CardMedia
            component="img"
            image={job.image.startsWith('http') ? job.image : `/media/${job.image}`}
            alt={job.company}
            sx={{ width: { xs: '100%', md: 220 }, height: 220, objectFit: 'contain', bgcolor: '#23272f', p: 2, borderRadius: 3 }}
          />
        )}
        <CardContent sx={{ flex: 1 }}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <CompanyTag company={job.company} />
            <LocationTag location={job.location} />
            <DateTag date={job.posted_at} />
            <Chip label={job.employment_type?.replace('_', ' ').toUpperCase()} color="secondary" size="small" icon={<WorkIcon sx={{ animation: `${bounce} 1.2s infinite` }} />} />
            {job.category && <Chip label={job.category} color="primary" size="small" />}
            <Chip label="Featured" color="success" size="small" />
            <Tooltip title="Share this job!">
              <IconButton color="primary" onClick={() => copyShareLink(job.id)}>
                <ShareIcon sx={{ animation: `${bounce} 2s infinite` }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {job.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
            {job.description}
          </Typography>
          <Button variant="contained" color="secondary" href={job.apply_url} target="_blank" rel="noopener noreferrer" size="large">
            👉 Apply Now
          </Button>
        </CardContent>
      </Card>
    </Fade>
  );
}

export default FeaturedJobCard;
