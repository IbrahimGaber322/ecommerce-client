import React, { useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { Box, Container, Grid, Typography } from '@mui/material'
import {
    selectProducts,
    selectProductLoading,
  } from "../store/product/productSlice";
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/product/productActions';
import ProductsSidebar from '../components/ProductsSidebar';

export default function Products() {
    const loading = useSelector(selectProductLoading);
    const dispatch: Dispatch<any> = useDispatch();
    const selectedProducts = useSelector(selectProducts);
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div style={{
            display: 'flex',
        }}>
            <ProductsSidebar/>
            <Grid container spacing={3} sx={{ padding: '30px' }}>
                {selectedProducts.map((product, index) => {
                    return(
                        <Grid item xs={3}>
                            <ProductCard key={index} product={product}/>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    
  )
}
