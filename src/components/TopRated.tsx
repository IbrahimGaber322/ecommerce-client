import React from 'react'
import ProductCard from './ProductCard'
import { Grid } from '@mui/material'

export default function TopRated() {
  return (
    <div>
        <h1 style={{
            textDecorationLine: 'underline',
            fontWeight: 'bold',

        }}>Top Rated</h1>
        <Grid container spacing={3} sx={{
            width: '90vw',
            margin: 'auto',
        }}>
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
