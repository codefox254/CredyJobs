import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

function Terms() {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, mb: 4, bgcolor: '#f8fafc' }}>
        <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom>Terms & Conditions</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          By using CredyJobs, you agree to the following terms:
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>1. Free Service</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          CredyJobs is free for both job seekers and employers. We do not charge for job applications or postings.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>2. User Conduct</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Users must provide accurate information and not use the platform for fraudulent or illegal activities.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>3. Content</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Job postings and user content must comply with applicable laws and must not be misleading or offensive.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>4. Disclaimer</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          We do our best to verify job postings, but cannot guarantee the authenticity of every listing. Always exercise caution and never pay to apply for a job.
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          For questions, contact <b>support@credyjobs.com</b>.
        </Typography>
      </Paper>
    </Box>
  );
}

export default Terms;
