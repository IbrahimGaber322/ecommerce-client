import { Box, Rating } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useAppDispatch } from '../../hooks/redux';
import { addRatingToProductAction, fetchAllRatesAction, updateRatingForProductAction } from '../../store/rate/rateActions';
import Product from '../../interfaces/Product';
import { useSelector } from 'react-redux';
import { selectRateLoading, selectRates } from '../../store/rate/rateSlice';
import { selectUser } from '../../store/auth/authSlice';
import Loading from '../../pages/Loading';
import { useNavigate } from 'react-router-dom';

export default function ProductDetailRate({product} : {product: Product}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const allRates = useSelector(selectRates);
  const loading = useSelector(selectRateLoading)
  const currUser = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchAllRatesAction());
  }, [dispatch])

  const userRate = useMemo(() => {
    return allRates?.find((rate: any) => rate.user === currUser?.id)
  }, [allRates])

  const addRate = (rate: number) => {
    dispatch(addRatingToProductAction({productId: product?.id, rating: rate}))
  };
  const updateRate = (rate: number) => {
    dispatch(updateRatingForProductAction({rateId: userRate?.id, rating: rate}))
  };
  if (loading) {
    return <Loading/>
  }
  return (
    <Box>
        <Rating name="half-rating" value={userRate?.rate || 0} 
        onChange={(event, value) => {
          currUser ?
          (userRate?.rate ? updateRate(value!) : addRate(value!)) :
          navigate('/login')
        }}/>
    </Box>
  )
}
