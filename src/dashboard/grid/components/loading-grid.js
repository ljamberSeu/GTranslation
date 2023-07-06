import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function Animations() {
  return (
    <Box sx={{ width: '100%', padding: '20px', gap: '100px' }}>
      <Skeleton sx={{height:'50px'}}/>
      <Skeleton animation="wave" sx={{height:'50px'}}/>
      <Skeleton animation={false} sx={{height:'50px'}}/>
    </Box>
  );
}