import { Box, Typography } from '@mui/material'
import React from 'react'

const SmallFooter = () => {
  return (
    <Box sx = {{ 
        height: '3rem',
        width: '100%',
        backgroundColor: '#a7a7a0',
        display: 'flex',
        marginTop: '1.5rem',
        alignItems: 'center'}}>
            <Typography variant = 'body2'>Mark</Typography>
     </Box>
  )
}

export default SmallFooter