import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

function PrivacyPolicy() {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, mb: 4, bgcolor: '#f8fafc' }}>
        <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom>Privacy Policy</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We value your privacy. CredyJobs does not collect unnecessary personal information. Any data you provide (such as your name, email, or resume) is used solely for job application purposes and is never sold or shared with third parties for marketing.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Information We Collect</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          - Information you provide when applying for jobs (name, email, resume, etc.)<br />
          - Usage data (pages visited, actions taken) for improving our service
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>How We Use Your Information</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          - To process your job applications<br />
          - To improve our platform and user experience<br />
          - To communicate with you about your applications
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Your Rights</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          - You can request deletion of your data at any time<br />
          - We do not sell or share your data for advertising
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          For any privacy concerns, contact us at <b>support@credyjobs.com</b>.
        </Typography>
      </Paper>
    </Box>
  );
}

export default PrivacyPolicy;
