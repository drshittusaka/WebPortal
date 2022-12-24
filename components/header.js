import React from 'react'
import { Grid } from '@mui/material'
import ImageCarousel from './imageCarousel'


function Header({logo, carousel}) {
  return (
    <div>
      <Grid container spacing={2}  alignItems='center'>
        <Grid item xs={12} sm={3} textAlign='center' border={2} ><ImageCarousel /></Grid>
        <Grid item xs={12} sm={9} textAlign='center' border={2}><ImageCarousel /></Grid>
      </Grid>
    </div>
  )
}

export default Header