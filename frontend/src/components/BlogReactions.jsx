import React, { useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const reactionsList = [
  { type: 'like', icon: <ThumbUpAltIcon color="primary" />, label: 'Like' },
  { type: 'love', icon: <FavoriteIcon color="error" />, label: 'Love' },
  { type: 'smile', icon: <EmojiEmotionsIcon sx={{ color: '#ffb300' }} />, label: 'Smile' },
];

function BlogReactions() {
  const [counts, setCounts] = useState({ like: 0, love: 0, smile: 0 });
  const [userReacted, setUserReacted] = useState(null);

  const handleReact = (type) => {
    if (!userReacted) {
      setCounts(c => ({ ...c, [type]: c[type] + 1 }));
      setUserReacted(type);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, mb: 2 }}>
      {reactionsList.map(r => (
        <Tooltip title={r.label} key={r.type}>
          <span>
            <IconButton onClick={() => handleReact(r.type)} disabled={!!userReacted} size="large">
              {r.icon}
            </IconButton>
            <Typography variant="caption" sx={{ fontWeight: 700, ml: 0.5 }}>{counts[r.type]}</Typography>
          </span>
        </Tooltip>
      ))}
    </Box>
  );
}

export default BlogReactions;
