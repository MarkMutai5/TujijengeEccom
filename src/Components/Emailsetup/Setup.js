import { Box, TextField, Button } from '@material-ui/core'
import { collection, onSnapshot } from 'firebase/firestore'
import React, { useRef, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { auth, database } from '../config/firebaseConfig'

const Setup = ( {uid}) => {

  const reviewRef = useRef()

  const date = new Date()
  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear()

  let currentDate = `${day}-${month}-${year}`

  console.log(uid);

  const handleSend = () => {
    auth.onAuthStateChanged(user => {
      if(user){
        database.collection('Reviews').add({
          UserId: uid,
          Review: reviewRef.current.value,
          DateUploaded: currentDate 
        }).then(() => {
          
          toast.success('Your review has been successfuly added')
        })
      }
    })
  }

  return (
    <div>
      <Box component='form'>
        <TextField label = 'Review' variant='outlined' multiline inputRef={reviewRef}/>
        <Button onClick = {handleSend}>Send</Button>
      </Box>
    </div>
  )
}

export default Setup