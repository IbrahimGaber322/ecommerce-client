import { Button, Card, CardActions, CardContent, CardMedia, Rating, Typography } from '@mui/material'
import React from 'react'
import productImage from '../assets/images/paper-made-shopping-bags_23-2147652055.avif'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export default function ProductCard() {
  return (
    <Card
    sx={{height: '400px', width: '80%'}}>
        <CardMedia 
        sx={{height: '40%', width: '100%'}}
        image={productImage}>

        </CardMedia>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Product
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Product Description is a lot of product description here because where
          </Typography>
          <Typography>
              $500.99
          </Typography>
          <div>
            <Rating name="read-only" value={3} readOnly />
          
          </div>
        </CardContent>
      <CardActions>
      <Button size='medium' sx={{backgroundColor: 'black', color:'white'}}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<ShoppingCartIcon/>}
                >
                Add to Cart
            </Button>
        <Button size="small"><FavoriteBorderIcon/></Button>
      </CardActions>
    </Card>
  )
}
