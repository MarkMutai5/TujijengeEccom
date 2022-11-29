import { Box, TextField, Button } from '@material-ui/core'
import React, { useRef } from 'react'
import { database } from '../config/firebaseConfig'

const Setup = ( {currentUser}) => {

  //console.log(currentUser)

  const reviewRef = useRef()

  const date = new Date()
  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear()

  let currentDate = `${day}-${month}-${year}`

  const handleSend = () => {
    database.collection('Reviews').add({
      UserId: currentUser.uid,
      Review: reviewRef.current.value,
      DateUploaded: currentDate 
    }).then(() => {})
  }

  return (
    <div>
      <Box>
        <TextField label = 'Review'  inputRef={reviewRef}/>
        <Button onClick = {handleSend}>Send</Button>
      </Box>
    </div>
  )
}

export default Setup