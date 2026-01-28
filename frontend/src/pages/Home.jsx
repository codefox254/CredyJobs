import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Fade } from '@mui/material';
import JobList from '../components/JobList';
import AdvertBoard from '../components/AdvertBoard';
import FeaturedJobCard from '../components/FeaturedJobCard';

function Home() {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  useEffect(() => {
    fetch('/api/jobs/?is_active=true&is_featured=true&ordering=-posted_at')
      .then(async res => {
        try {
          if (!res.ok) {
            const text = await res.text();
            throw new Error(`HTTP ${res.status}: ${text}`);
          }
          return await res.json();
        } catch (err) {
          setFetchError('Could not load featured jobs.');
          console.error('Error parsing jobs JSON:', err);
          setFeaturedJobs([]);
          return [];
        }
      })
      .then(data => {
        if (Array.isArray(data)) {
          setFeaturedJobs(data.slice(0, 5));
        }
      });
  }, []);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', px: 0, py: 0, bgcolor: '#fff', color: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Featured jobs bar (label removed, bar now occupies space directly) */}
      {featuredJobs.length > 0 && (
        <>
          {/* Unique, simple label above bar */}
          <Box sx={{ width: '100%', maxWidth: 1800, mx: 'auto', mt: 4, mb: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', px: 2 }}>
            <Box sx={{
              bgcolor: '#fff',
              color: '#1db954',
              px: 3,
              py: 1,
              borderRadius: 4,
              fontWeight: 900,
              fontSize: 28,
              letterSpacing: 2,
              boxShadow: '0 2px 8px 0 #1db95433',
              border: '2px solid #1db954',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}>
              <span style={{ fontSize: 36, marginRight: 10, verticalAlign: 'middle' }}>🌟</span>
              Featured Jobs
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              maxWidth: 1800,
              mt: 1,
              mb: 3,
              px: 2,
              py: 3,
              borderRadius: 5,
              display: 'flex',
              gap: 3,
              overflowX: 'auto',
              boxShadow: '0 12px 40px 0 rgba(30,185,84,0.13)',
              background: 'linear-gradient(90deg, #1db954 0%, #1976d2 100%)',
              border: '2.5px solid #fff',
              zIndex: 2,
              minHeight: 340,
              alignItems: 'flex-start',
            }}
          >
            {featuredJobs.map(job => (
              <Box key={job.id} sx={{ minWidth: 340, maxWidth: 370, flex: '0 0 auto', zIndex: 2 }}>
                <FeaturedJobCard job={job} />
              </Box>
            ))}
          </Box>
        </>
      )}
      {/* Main jobs area */}
      <Box sx={{
        width: '100%',
        maxWidth: 1800,
        mb: 4,
        bgcolor: '#fff',
        color: '#111',
        borderRadius: 4,
        boxShadow: '0 8px 32px 0 rgba(60,72,88,0.12)',
        border: '1px solid #e0e0e0',
        px: { xs: 1, sm: 3, md: 6 },
        py: 4,
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Typography variant="h5" color="secondary" fontWeight={600} mb={2} mt={2}>
          Latest Jobs
        </Typography>
        <JobList />
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>Browse the latest jobs and apply directly to recruiters.</Typography>
      </Box>
      {/* Adverts before footer */}
      <Box sx={{ width: '100%', maxWidth: 1800, mb: 2 }}>
        <AdvertBoard />
      </Box>
    </Box>
  );
}

export default Home;
