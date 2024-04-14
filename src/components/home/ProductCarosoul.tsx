import React, { useEffect } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useAppDispatch } from '../../hooks/redux';
import { useSelector } from 'react-redux';
import { selectPopularProducts, selectProductLoading } from '../../store/product/productSlice';
import { fetchPopularProducts } from '../../store/product/productActions';
import ProductCard from '../product/ProductCard';
import { Box } from '@mui/material';
import Loading from '../../pages/Loading';


export default function ProductCarosoul() {
    const dispatch = useAppDispatch()
    const popularProducts = useSelector(selectPopularProducts)
    const loading = useSelector(selectProductLoading)
    useEffect(() => {
        dispatch(fetchPopularProducts())
    },[dispatch])

    console.log("Popular products",popularProducts);

    if(loading) {
      return <Loading/>
    }
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
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
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
                infinite={true}
                >
                {popularProducts?.map((product, index) => {
                    return(
                        <ProductCard product={product} key={index}/>
                    );
                })}
            </Carousel>
        </Box>
        
    )
}
