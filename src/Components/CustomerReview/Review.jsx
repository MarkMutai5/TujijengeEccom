import { Box } from '@mui/material'
import React, {useState} from 'react'
import { useEffect } from 'react'


const Review = () => {

  const reviews = [
    {id: 1, name: 'mark', title: 'bad service'},
    {id: 2, name: 'mutai', title: 'good service. keep it up'},
  ]

  
  
  return (
    <>
        <Box sx = {{minWidth: 400,
             width: '50%', 
             height: 200, 
             display: 'flex', 
             alignItems: 'center',
             borderRadius: 2,
             marginTop: 5,
             marginLeft: 3,
             border: 1,
             borderColor: 'blue'}}>

        {/* {reviews.map((review) => (
          <Box key = {review.id} sx= {{display: 'flex', justifyContent: 'flex-start'}}>
            <Box>{review.name}</Box> 
            <Box>{review.title}</Box><br />
          </Box>
        ))} */}
{/* 
        <p>{orders[0].UserId}</p> */}

        
        </Box>

    </>
  )
}

export default Review