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
            <Chip label={job.employment_type?.replace('_', ' ').toUpperCase()} color="secondary" size="small" icon={<WorkIcon sx={{ color: '#e53935', animation: `${bounce} 1.2s infinite` }} />} />
            {job.category && <Chip label={job.category} sx={{ bgcolor: '#fff3e0', color: '#d84315', fontWeight: 600 }} size="small" />}
            <Chip label="Featured" sx={{ bgcolor: '#fffde7', color: '#e53935', fontWeight: 700 }} size="small" />
            <Tooltip title="Share this job!">
              <IconButton color="secondary" onClick={() => copyShareLink(job.id)}>
                <ShareIcon sx={{ animation: `${bounce} 2s infinite`, color: '#e53935' }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: 'secondary.main', mb: 1, fontFamily: 'Inter, Roboto, Arial, sans-serif', fontSize: { xs: 20, sm: 24, md: 26 } }}>
            {job.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-line', fontSize: 16, color: 'secondary.main', fontWeight: 400, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
            {job.description}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            href={job.apply_url}
            target="_blank"
            rel="noopener noreferrer"
            size="large"
            sx={{ fontWeight: 600, fontSize: 16, px: 4, py: 1.5, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}
          >
            👉 Apply Now
          </Button>
        </CardContent>
      </Card>
    </Fade>
  );
}

export default FeaturedJobCard;
