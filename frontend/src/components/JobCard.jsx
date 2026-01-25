import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip, Stack, Fade, IconButton, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
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

function JobCard({ job }) {
  return (
    <Fade in timeout={600}>
      <Card sx={{ mb: 3, borderRadius: 4, boxShadow: 4, bgcolor: 'background.paper', color: 'text.primary', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, overflow: 'hidden', position: 'relative', height: '100%' }}>
        {job.image && (
          <CardMedia
            component="img"
            image={job.image.startsWith('http') ? job.image : `/media/${job.image}`}
            alt={job.company}
            sx={{ width: { xs: '100%', sm: 120 }, height: 120, objectFit: 'contain', bgcolor: '#f5f5f5', p: 2, borderRadius: 0 }}
          />
        )}
        <CardContent sx={{ flex: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <Chip icon={<WorkIcon sx={{ color: '#e53935', animation: `${bounce} 1.2s infinite` }} />} label={job.employment_type?.replace('_', ' ').toUpperCase()} size="small" color="secondary" />
            {job.category && <Chip label={job.category} size="small" sx={{ bgcolor: '#fff3e0', color: '#d84315', fontWeight: 600 }} />}
            <Chip icon={<CalendarMonthIcon sx={{ color: '#d84315', animation: `${bounce} 1.5s infinite` }} />} label={new Date(job.posted_at).toLocaleDateString()} size="small" sx={{ bgcolor: '#fffde7', color: '#fbc02d', fontWeight: 600 }} />
          </Stack>
          <Typography variant="h6" component={RouterLink} to={`/job/${job.id}`} sx={{ textDecoration: 'none', color: '#111', fontWeight: 700, cursor: 'pointer', mb: 0.5, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
            {job.title}
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', fontFamily: 'Inter, Roboto, Arial, sans-serif', color: '#111', fontWeight: 600 }}>
            <PlaceIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5, color: '#43a047', animation: `${bounce} 1.7s infinite` }} />
            {job.company} • {job.location}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: '#111', fontFamily: 'Inter, Roboto, Arial, sans-serif', fontWeight: 600 }}>
            {job.description?.slice(0, 120)}{job.description?.length > 120 ? '...' : ''}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button variant="contained" color="secondary" href={job.apply_url} target="_blank" rel="noopener noreferrer" size="small" sx={{ fontWeight: 600, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
              Apply
            </Button>
            <Tooltip title="Share this job!">
              <IconButton color="primary" onClick={() => copyShareLink(job.id)}>
                <ShareIcon sx={{ animation: `${bounce} 2s infinite`, color: '#1976d2' }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </CardContent>
      </Card>
    </Fade>
  );
}

export default JobCard;
