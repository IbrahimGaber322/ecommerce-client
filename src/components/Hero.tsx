import { Box, Button, Container } from '@mui/material'
import React from 'react'
import heroImg from '../assets/images/paper-made-shopping-bags_23-2147652055.avif'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
export default function Hero() {
    const navigate = useNavigate();
  return (
    <Box sx={{
        position: "relative", 
        height: "80vh",
        width: "80vw",
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
            textAlign: 'left',
            top: '10%',
            fontWeight: 'bold',
            color: 'black',
            width: '90%',
            margin: 'auto',
        }}>
            <h1 style={{
                backgroundColor:'white',
                fontSize: '3rem',
                width: 'fit-content',
                paddingRight: '50px'
            }}>Discover</h1>
            <h1 style={{
                fontSize: '3rem'
            }}>Shop</h1>
            <h1 style={{
                backgroundColor:'#fffd8d',
                fontSize: '3rem',
                width: 'fit-content',
                paddingRight: '50px'
            }}>Enjoy.</h1>
            <p>Every purchase tells a story.</p>
            <Button sx={{backgroundColor: 'black', color:'white'}}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<ShoppingCartIcon/>}
                >
                Shop Now
            </Button>
            <Button sx={{backgroundColor: 'black', color:'white'}}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<ShoppingCartIcon/>}
                onClick={() => navigate('/cart')}product-details
                >
               Cart
            </Button>
            <Button sx={{backgroundColor: 'black', color:'white'}}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<ShoppingCartIcon/>}
                onClick={() => navigate('/product-details')}
                >
              ProductDetail
            </Button>
        </div>
    </Box>
  )
}
