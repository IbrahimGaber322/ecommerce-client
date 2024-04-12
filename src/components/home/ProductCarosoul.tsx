import React, { useEffect } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useAppDispatch } from '../../hooks/redux';
import { useSelector } from 'react-redux';
import { selectPopularProducts } from '../../store/product/productSlice';
import { fetchPopularProducts } from '../../store/product/productActions';
import ProductCard from '../product/ProductCard';
import { Box } from '@mui/material';


export default function ProductCarosoul() {
    const dispatch = useAppDispatch()
    const popularProducts = useSelector(selectPopularProducts)

    useEffect(() => {
        dispatch(fetchPopularProducts())
    },[dispatch])
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 768 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 767, min: 0 },
          items: 1
        }
      };
    return (
        <Box sx={{
            width: '75%',
            margin: 'auto',
            marginTop: '1rem',
        }}>
            <Carousel
                responsive={responsive}
                >
                {popularProducts.map((product, index) => {
                    return(
                        <ProductCard product={product} key={index}/>
                    );
                })}
            </Carousel>
        </Box>
        
    )
}
