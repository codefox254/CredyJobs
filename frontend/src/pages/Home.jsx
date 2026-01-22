import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Fade } from '@mui/material';
import JobList from '../components/JobList';
import FeaturedJobCard from '../components/FeaturedJobCard';

function Home() {
  const [featuredJob, setFeaturedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/jobs/?is_active=true&ordering=-posted_at')
      .then(res => res.json())
      .then(data => {
        setFeaturedJob(data.length > 0 ? data[0] : null);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load featured job.');
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', px: 0, py: 0, bgcolor: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Box sx={{
        width: '100%',
        maxWidth: 1800,
        mt: 4,
        mb: 4,
        bgcolor: '#fff',
        borderRadius: 4,
        boxShadow: '0 8px 32px 0 rgba(60,72,88,0.12)',
        border: '1px solid #e0e0e0',
        px: { xs: 1, sm: 3, md: 6 },
        py: 4,
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {loading ? (
          <CircularProgress sx={{ mt: 4 }} />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : featuredJob ? (
          <Fade in timeout={800}>
            <Box>
              <FeaturedJobCard job={featuredJob} />
            </Box>
          </Fade>
        ) : null}
        <Typography variant="h5" color="secondary" fontWeight={600} mb={2} mt={2}>
          Latest Jobs
        </Typography>
        <JobList />
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>Browse the latest jobs and apply directly to recruiters.</Typography>
      </Box>
    </Box>
  );
}

export default Home;
