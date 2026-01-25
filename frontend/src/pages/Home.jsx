import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Fade } from '@mui/material';
import JobList from '../components/JobList';
import AdvertBoard from '../components/AdvertBoard';
import FeaturedJobCard from '../components/FeaturedJobCard';

function Home() {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  useEffect(() => {
    fetch('/api/jobs/?is_active=true&ordering=-posted_at')
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
          // Fallback jobs if fetch fails
          const fallbackJobs = [
            {
              id: 1,
              title: 'AI Solutions Architect',
              description: 'Lead AI projects and design scalable solutions',
              location: 'Nairobi',
              company: 'AI Innovators',
              apply_url: 'https://company.com/apply/ai-arch',
              employment_type: 'full_time',
              category: 'Featured',
              is_active: true,
              image: 'job_images/add1.jpg',
              posted_at: new Date().toISOString(),
            },
            {
              id: 2,
              title: 'Senior Data Scientist',
              description: 'Analyze data and build predictive models',
              location: 'Mombasa',
              company: 'DataGenius',
              apply_url: 'https://company.com/apply/data-sci',
              employment_type: 'full_time',
              category: 'Featured',
              is_active: true,
              image: 'job_images/add2.jpg',
              posted_at: new Date().toISOString(),
            },
            {
              id: 3,
              title: 'Creative Marketing Lead',
              description: 'Drive creative campaigns and brand growth',
              location: 'Kisumu',
              company: 'BrandMakers',
              apply_url: 'https://company.com/apply/marketing-lead',
              employment_type: 'full_time',
              category: 'Featured',
              is_active: true,
              image: 'job_images/add3.jpg',
              posted_at: new Date().toISOString(),
            },
            {
              id: 4,
              title: 'Remote DevOps Engineer',
              description: 'Maintain cloud infrastructure remotely',
              location: 'Remote',
              company: 'CloudOps',
              apply_url: 'https://company.com/apply/devops',
              employment_type: 'remote',
              category: 'Featured',
              is_active: true,
              image: 'job_images/add4.jpg',
              posted_at: new Date().toISOString(),
            },
            {
              id: 5,
              title: 'Healthcare Product Manager',
              description: 'Oversee product lifecycle in health tech',
              location: 'Nakuru',
              company: 'HealthBridge',
              apply_url: 'https://company.com/apply/health-pm',
              employment_type: 'full_time',
              category: 'Featured',
              is_active: true,
              image: 'job_images/add5.jpg',
              posted_at: new Date().toISOString(),
            },
          ];
          setFeaturedJobs(fallbackJobs);
          return fallbackJobs;
        }
      })
      .then(data => {
        if (Array.isArray(data)) {
          setFeaturedJobs(data.filter(j => j.category && j.category.toLowerCase().includes('featured')).slice(0, 5));
        }
      });
  }, []);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', px: 0, py: 0, bgcolor: '#fff', color: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Featured jobs bar */}
      {fetchError && featuredJobs.length > 0 && (
        <Box sx={{ color: 'secondary.main', my: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <span role="img" aria-label="featured">🌟</span>
          <Typography color="secondary">Featured jobs available below!</Typography>
        </Box>
      )}
      {featuredJobs.length > 0 && (
        <Box sx={{ width: '100%', maxWidth: 1800, mt: 2, mb: 2, px: 2, py: 1, bgcolor: '#1db954', borderRadius: 3, display: 'flex', gap: 2, overflowX: 'auto', boxShadow: 2 }}>
          {featuredJobs.map(job => (
            <Box key={job.id} sx={{ minWidth: 320, maxWidth: 340, flex: '0 0 auto' }}>
              <FeaturedJobCard job={job} />
            </Box>
          ))}
        </Box>
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
