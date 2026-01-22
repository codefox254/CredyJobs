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
      <Card
        sx={{
          mb: 4,
          borderRadius: 6,
          boxShadow: '0 8px 32px 0 rgba(60,72,88,0.18)',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          bgcolor: 'rgba(255,255,255,0.7)',
          color: 'text.primary',
          position: 'relative',
          overflow: 'hidden',
          border: '2px solid',
          borderImage: 'linear-gradient(90deg, #00c6ff 0%, #0072ff 100%) 1',
          backdropFilter: 'blur(12px)',
          transition: 'box-shadow 0.3s',
          '&:hover': {
            boxShadow: '0 12px 40px 0 rgba(0,114,255,0.25)',
            borderImage: 'linear-gradient(90deg, #ffaf7b 0%, #d76d77 100%) 1',
          },
        }}
      >
        {job.image && (
          <Box sx={{ position: 'relative', width: { xs: '100%', md: 260 }, height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', bgcolor: '#23272f' }}>
            <CardMedia
              component="img"
              image={job.image.startsWith('http') ? job.image : `/media/${job.image}`}
              alt={job.company}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.92, filter: 'blur(0px) saturate(1.2)' }}
            />
            <Box sx={{ position: 'absolute', bottom: 10, left: 10, bgcolor: 'rgba(0,0,0,0.55)', px: 2, py: 0.5, borderRadius: 2 }}>
              <Typography variant="subtitle2" color="#fff" fontWeight={600}>{job.company}</Typography>
            </Box>
          </Box>
        )}
        <CardContent sx={{ flex: 1, position: 'relative', zIndex: 2 }}>
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
          <Typography variant="h3" fontWeight={800} gutterBottom sx={{ background: 'linear-gradient(90deg,#0072ff,#00c6ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 1 }}>
            {job.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-line', fontSize: 18, color: '#23272f', fontWeight: 500 }}>
            {job.description}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            href={job.apply_url}
            target="_blank"
            rel="noopener noreferrer"
            size="large"
            sx={{ fontWeight: 700, fontSize: 18, px: 4, py: 1.5, boxShadow: '0 2px 8px rgba(0,114,255,0.12)' }}
          >
            👉 Apply Now
          </Button>
        </CardContent>
      </Card>
    </Fade>
  );
}

export default FeaturedJobCard;
