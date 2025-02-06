import { useState } from 'react'
import { Approute } from './Approute'
import { Box } from '@mui/material'
import Theme from './Theme'
import Footer from './Assets/Component/Footer'
import './index.css'

function App() {

  return (
    <>
      <Box sx={{ padding: '5px', backgroundColor: Theme.primary[100], backgroundSize: "cover", width: "100%", border: "1px solid black" }}>
        <Approute />
        <Footer />
      </Box>

    </>
  )
}

export default App
