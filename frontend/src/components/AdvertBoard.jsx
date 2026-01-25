


import React, { useEffect, useState } from 'react';
import { Box, Fade, IconButton, Button, Modal, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';



function AdvertBoard() {
  const [adverts, setAdverts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // TODO: Replace with real auth check
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAdvert, setSelectedAdvert] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/adverts/?is_active=true')
      .then(res => res.json())
      .then(data => setAdverts(data))
      .catch(() => setAdverts([]));
  }, []);

  useEffect(() => {
    if (!adverts.length) return;
    const timer = setInterval(() => {
      setOffset(prev => (prev + 1) % adverts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [adverts.length]);

  const handleEmail = () => {
    window.location.href = 'mailto:fankodero@gmail.com?subject=Advertise%20on%20CredyJobs&body=I%20would%20like%20to%20advertise%20on%20your%20platform.';
  };

  const handleUpload = (e) => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploadError('Upload feature coming soon!');
    }, 1200);
  };


  return (
    <Box sx={{ width: '100%', maxWidth: 1800, mx: 'auto', px: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, mb: 2 }}>
      {/* Unique header with gradient and floating effect */}
      <Box sx={{ width: '100%', maxWidth: 1400, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
        <Box sx={{
          background: 'linear-gradient(90deg, #1db954 0%, #1976d2 100%)',
          color: '#fff',
          px: { xs: 3, sm: 7 },
          py: 2,
          borderRadius: 4,
          fontSize: { xs: 22, sm: 30 },
          fontWeight: 900,
          letterSpacing: 2,
          boxShadow: '0 6px 32px 0 rgba(30,185,84,0.18)',
          textShadow: '0 2px 8px #1976d2',
          border: '2px solid #fff',
          transform: 'rotate(-2deg) skew(-2deg)',
        }}>
          <span style={{ filter: 'drop-shadow(0 2px 8px #1db954)' }}>Advertise with CredyJobs</span>
        </Box>
        <Box>
          <IconButton onClick={handleEmail} sx={{ bgcolor: '#fff', color: '#1db954', ml: 2, boxShadow: 2, '&:hover': { bgcolor: '#eaffea' } }} color="primary">
            <EmailIcon />
          </IconButton>
          {isAdmin && (
            <Button component="label" variant="contained" color="secondary" size="small" startIcon={<AddPhotoAlternateIcon />} sx={{ ml: 2 }} disabled={uploading}>
              Upload Banner
              <input type="file" accept="image/*" hidden onChange={handleUpload} />
            </Button>
          )}
        </Box>
      </Box>
      {/* Modern carousel for adverts */}
      <Box sx={{ width: '100%', maxWidth: 1400, display: 'flex', flexDirection: 'row', gap: 3, justifyContent: 'center', alignItems: 'stretch', overflowX: 'auto', py: 2, position: 'relative' }}>
        {adverts.length === 0 && (
          <Box sx={{ color: 'text.secondary', fontSize: 20, fontWeight: 500, p: 4 }}>No adverts available at the moment.</Box>
        )}
        {adverts.slice(offset, offset + 5).map((advert, i) => (
          <Fade in key={advert.id} timeout={800}>
            <Box
              sx={{
                minWidth: 420,
                maxWidth: 500,
                height: 340,
                borderRadius: 8,
                bgcolor: 'rgba(255,255,255,0.97)',
                boxShadow: '0 12px 40px 0 rgba(30,185,84,0.18), 0 0 0 2px #1db954 inset',
                border: '2.5px solid #1db954',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                p: 2,
                position: 'relative',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s, border-color 0.3s',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: '0 16px 60px 0 #1976d2cc',
                  borderColor: '#1976d2',
                  transform: 'scale(1.04) rotate(-1deg)',
                },
              }}
              onClick={() => { setSelectedAdvert(advert); setOpenModal(true); }}
            >
              {advert.image && (
                <img
                  src={advert.image.startsWith('http') ? advert.image : `/media/${advert.image}`}
                  alt={advert.title}
                  style={{ width: '100%', height: 210, objectFit: 'cover', borderRadius: 8, marginBottom: 16, boxShadow: '0 4px 18px #1db95433' }}
                  onError={e => { e.target.onerror = null; e.target.src = '/media/job_images/add1.jpg'; }}
                />
              )}
              <Box sx={{ width: '100%', textAlign: 'center', mb: 1 }}>
                <span style={{ fontWeight: 800, fontSize: 24, color: '#1976d2', letterSpacing: 1 }}>{advert.title}</span>
              </Box>
              <Box sx={{ width: '100%', textAlign: 'center', mb: 1 }}>
                <span style={{ fontWeight: 500, fontSize: 17, color: '#333', opacity: 0.85 }}>{advert.description}</span>
              </Box>
              {advert.url && (
                <Button href={advert.url} target="_blank" rel="noopener noreferrer" variant="outlined" color="secondary" sx={{ mt: 'auto', fontWeight: 700, borderRadius: 3, px: 3, py: 1, borderWidth: 2 }} onClick={e => e.stopPropagation()}>
                  Visit
                </Button>
              )}
              <Box sx={{ position: 'absolute', top: 10, right: 10, bgcolor: '#1db954', color: '#fff', px: 1.5, py: 0.5, borderRadius: 2, fontSize: 15, fontWeight: 700, letterSpacing: 1, boxShadow: '0 1px 4px #1db95444' }}>
                Sponsored
              </Box>
            </Box>
          </Fade>
        ))}
      </Box>
      {/* Modal for advert details */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#fff',
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
          minWidth: 350,
          maxWidth: 600,
          outline: 'none',
        }}>
          {selectedAdvert && (
            <>
              {selectedAdvert.image && (
                <img
                  src={selectedAdvert.image.startsWith('http') ? selectedAdvert.image : `/media/${selectedAdvert.image}`}
                  alt={selectedAdvert.title}
                  style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 8, marginBottom: 18, boxShadow: '0 4px 18px #1db95433' }}
                  onError={e => { e.target.onerror = null; e.target.src = '/media/job_images/add1.jpg'; }}
                />
              )}
              <Typography variant="h5" fontWeight={800} color="secondary" gutterBottom>{selectedAdvert.title}</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{selectedAdvert.description}</Typography>
              {selectedAdvert.url && (
                <Button href={selectedAdvert.url} target="_blank" rel="noopener noreferrer" variant="contained" color="secondary" sx={{ fontWeight: 700, borderRadius: 3, px: 3, py: 1, borderWidth: 2 }}>
                  Visit
                </Button>
              )}
            </>
          )}
        </Box>
      </Modal>
      {uploadError && (
        <Box sx={{ color: 'error.main', mt: 1 }}>{uploadError}</Box>
      )}
    </Box>
  );
}

export default AdvertBoard;
