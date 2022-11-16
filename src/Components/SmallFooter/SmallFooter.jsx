import { Box, Typography } from '@mui/material'
import React from 'react'

const SmallFooter = () => {
  return (
    <Box sx = {{bottom: 0, 
        position: 'fixed', 
        height: '3rem',
        width: '100%',
        backgroundColor: '#a7a7a0',
        display: 'flex',
        alignItems: 'center'}}>
            <Typography variant = 'body2'>Mark</Typography>
     </Box>
  )
}

export default SmallFooter