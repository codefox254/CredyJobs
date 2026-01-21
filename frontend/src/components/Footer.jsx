import React, { useState, useEffect } from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

function Footer() {
  const [footer, setFooter] = useState({
    text: '© 2026 CredyJobs. All rights reserved.',
    contact: 'Contact: admin@credyjobs.com',
    links: [
      { label: 'Privacy Policy', url: '/privacy' },
      { label: 'Terms', url: '/terms' }
    ]
  });
  const [isAdmin, setIsAdmin] = useState(false); // TODO: Replace with real auth check

  useEffect(() => {
    axios.get('/api/footer/')
      .then(res => setFooter(res.data))
      .catch(() => {});
  }, []);

  return (
    <Box component="footer" sx={{ mt: 8, py: 4, textAlign: 'center', color: '#fff', bgcolor: '#181818', borderTop: '1px solid #333' }}>
      <Typography variant="body2" sx={{ mb: 1 }}>{footer.text}</Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>{footer.contact}</Typography>
      <Box>
        {footer.links && footer.links.map((link, i) => (
          <Link key={i} href={link.url} color="secondary" underline="hover" sx={{ mx: 1 }}>
            {link.label}
          </Link>
        ))}
      </Box>
      {isAdmin && (
        <IconButton color="secondary" size="small" sx={{ ml: 2 }}>
          <EditIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
}

export default Footer;
