import React from 'react'
import { ScaleLoader } from 'react-spinners';
import './spinner.css'

const Spinner = () => {
  return (
    <>
    <div className='spinnerContainer'>
        <ScaleLoader color="#36d7b7"/>
    </div>
       
    </>
  )
}

export default Spinner