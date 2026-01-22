

import React, { useEffect, useState } from 'react';
import { Box, Fade, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

const imageFiles = [
  'add1.jpg', 'add2.jpg', 'add3.jpg', 'add4.jpg', 'add4.png', 'add5.jpg', 'add6.jpg', 'add7.jpg', 'add8.jpg', 'add9.jpg', 'add10.jpg', 'add11.jpg',
  'Screenshot_20260121_150656.png', 'Screenshot_20260121_150656_CXwV0Sy.png', 'Screenshot_20260121_150656_CXwV0Sy_juBGNIa.png',
  'Screenshot_20260121_151549.png', 'Screenshot_20260121_151549_Np0oL37.png'
];

function AdvertBoard() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % imageFiles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleEmail = () => {
    window.location.href = 'mailto:fankodero@gmail.com?subject=Advertise%20on%20CredyJobs&body=I%20would%20like%20to%20advertise%20on%20your%20platform.';
  };

  if (!imageFiles.length) return null;

  const img = imageFiles[current];

  return (
    <Box sx={{ width: '100vw', maxWidth: '100vw', px: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 6, mb: 2, position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
      <Fade in timeout={800}>
        <Box sx={{
          width: '100vw',
          maxWidth: '100vw',
          height: { xs: 200, sm: 300, md: 380 },
          borderRadius: 0,
          boxShadow: '0 16px 48px 0 rgba(46, 204, 113, 0.18)',
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(90deg,#d0f5df 0%,#eaffea 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'box-shadow 0.3s',
          '&:hover': {
            boxShadow: '0 24px 80px 0 rgba(46, 204, 113, 0.25)',
          },
        }}>
          <img
            src={`/media/job_images/${img}`}
            alt="Advert"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0, transition: 'transform 0.5s cubic-bezier(.4,2,.6,1)', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)' }}
          />
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            bgcolor: 'rgba(0,0,0,0.22)',
            color: '#fff',
            px: { xs: 2, sm: 6 },
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            backdropFilter: 'blur(2px)',
            fontSize: { xs: 16, sm: 22 },
            fontWeight: 600,
            letterSpacing: 1,
          }}>
            <span>Advertise with CredyJobs</span>
            <IconButton
              onClick={handleEmail}
              sx={{ bgcolor: '#fff', color: '#0072ff', ml: 2, boxShadow: 2, '&:hover': { bgcolor: '#eaffea' } }}
              color="primary"
            >
              <EmailIcon />
            </IconButton>
          </Box>
        </Box>
      </Fade>
    </Box>
  );
}

export default AdvertBoard;
