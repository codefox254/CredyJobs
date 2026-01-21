import React from 'react';
import { Typography, Box, Button, Card, CardContent, CardMedia, Chip } from '@mui/material';
import JobList from '../components/JobList';
import CompanyTag from '../components/CompanyTag';
import LocationTag from '../components/LocationTag';
import DateTag from '../components/DateTag';

const featuredJob = {
  id: 1,
  title: 'Information Systems Security Officer',
  company: 'Guaranty Trust Bank Plc (GTBank Kenya)',
  location: 'Nairobi, Kenya',
  deadline: '2026-01-26',
  description: `This role is key to strengthening the bank’s information security framework and ensuring secure, resilient banking operations.\n\nThis opportunity is ideal for professionals with a strong interest in cybersecurity, risk management, and secure financial systems, looking to grow their careers within a leading banking institution.`,
  apply_url: 'https://lnkd.in/dMiUKN7t',
  image: 'https://www.gtbank.com/themes/custom/gtbank/logo.png',
};

function Home() {
  return (
    <Box>
      <Card sx={{ mb: 4, borderRadius: 4, boxShadow: 6, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, bgcolor: '#181818', color: '#fff' }}>
        <CardMedia
          component="img"
          image={featuredJob.image}
          alt={featuredJob.company}
          sx={{ width: { xs: '100%', md: 220 }, height: 220, objectFit: 'contain', bgcolor: '#23272f', p: 2, borderRadius: 3 }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <CompanyTag company={featuredJob.company} />
            <LocationTag location={featuredJob.location} />
            <DateTag date={featuredJob.deadline} />
            <Chip label="Featured" color="secondary" size="small" />
          </Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {featuredJob.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
            {featuredJob.description}
          </Typography>
          <Button variant="contained" color="secondary" href={featuredJob.apply_url} target="_blank" rel="noopener noreferrer" size="large">
            👉 Apply Now
          </Button>
        </CardContent>
      </Card>
      <Typography variant="h5" color="secondary" fontWeight={600} mb={2}>
        Latest Jobs
      </Typography>
      <JobList />
      <Typography variant="body1" color="text.secondary">Browse the latest jobs and apply directly to recruiters.</Typography>
    </Box>
  );
}

export default Home;
