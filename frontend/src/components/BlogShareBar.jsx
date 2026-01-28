import React from 'react';
import { Box, IconButton, Tooltip, Typography, Snackbar } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function BlogShareBar({ blog }) {
  const [open, setOpen] = React.useState(false);
  const url = window.location.href;
  const title = blog?.title || '';

  const handleShare = (platform) => {
    let shareUrl = '';
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    }
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = () => {
    if (navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(url)
        .then(() => setOpen(true))
        .catch(() => fallbackCopy());
    } else {
      fallbackCopy();
    }
  };

  // Fallback for older browsers or environments without clipboard API
  const fallbackCopy = () => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setOpen(true);
    } catch (err) {
      alert('Copy to clipboard not supported in this browser.');
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, mb: 2 }}>
      <Tooltip title="Share">
        <IconButton onClick={handleCopy} color="primary">
          <ShareIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share on Twitter">
        <IconButton onClick={() => handleShare('twitter')} sx={{ color: '#1da1f2' }}>
          <TwitterIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share on Facebook">
        <IconButton onClick={() => handleShare('facebook')} sx={{ color: '#1877f3' }}>
          <FacebookIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share on LinkedIn">
        <IconButton onClick={() => handleShare('linkedin')} sx={{ color: '#0077b5' }}>
          <LinkedInIcon />
        </IconButton>
      </Tooltip>
      <Typography variant="caption" color="text.secondary">Share this post</Typography>
      <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)} message="Link copied!" />
    </Box>
  );
}

export default BlogShareBar;
