import { useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { Grid } from '@mui/material'
import {
    selectProducts,
    selectProductLoading,
  } from "../store/product/productSlice";
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { searchProductsAction } from '../store/product/productActions';
import ProductsSidebar from '../components/ProductsSidebar';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

export default function Products() {
    const loading = useSelector(selectProductLoading);
    const dispatch: Dispatch<any> = useDispatch();
    const selectedProducts = useSelector(selectProducts);
    // const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    // const [paramsData, setParamsData] = useState({})
    const paramsData = {
        name: searchParams.get('name') || undefined,
        category: searchParams.get('category') || undefined,
        minPrice: searchParams.get('minPrice') || undefined,
        maxPrice: searchParams.get('maxPrice') || undefined,
        minRating: searchParams.get('minRating') || undefined,
        maxRating: searchParams.get('maxRating') || undefined,
    };
    // setParamsData({
    //     name: searchParams.get('name'),
    //     category: searchParams.get('category'),
    //     minPrice: searchParams.get('minPrice'),
    //     maxPrice: searchParams.get('maxPrice'),
    //     minRating: searchParams.get('minRating'),
    //     maxRating: searchParams.get('maxRating'),
    // });
    useEffect(() => {
        dispatch(searchProductsAction(paramsData));
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
