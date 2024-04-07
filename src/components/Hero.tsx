import { Box, Container } from '@mui/material'
import React from 'react'
import heroImg from '../assets/images/design-ecommerce-website-hero.jpg'
export default function Hero() {
  return (
    <Box sx={{
        position: "relative", 
        height: "80vh",
        width: "70vw",
        margin:"auto",
        }}>
        <img src={heroImg} alt='' 
        style={{
            position:"absolute", 
            width: "100%",
            height: "100%"
            }}></img>
        <div style={{
            position: 'relative',
            zIndex: '1',
            fontSize: '1.5rem',
            textAlign: 'center',
            top: '30%',
            fontWeight: 'bold',
            color: 'black'
        }}>
            <h2>Welcome to <span style={{}}>BAZAAR</span></h2>
            <h3>Where every purchase tells a story.</h3>
        </div>
    </Box>
  )
}
