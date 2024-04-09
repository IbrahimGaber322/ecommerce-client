import React from 'react'
import ProductCard from '../components/ProductCard'
import { Grid } from '@mui/material'

export default function Products() {
  return (
    <div style={{
        display: 'flex',
        
    }}>

        <Grid container spacing={2} sx={{marginTop: '50px'}}>
            <Grid item xs={3}>
                <ProductCard></ProductCard>
            </Grid>
            <Grid item xs={3}>
                <ProductCard></ProductCard>
            </Grid>
            <Grid item xs={3}>
                <ProductCard></ProductCard>
            </Grid>
            <Grid item xs={3}>
                <ProductCard></ProductCard>
            </Grid>
        </Grid>
    </div>
    
  )
}
