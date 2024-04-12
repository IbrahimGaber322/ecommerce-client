import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { Box, Button, Typography, Modal, TextField, Rating, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Review from '../interfaces/Review';
import { addReviewToProductAction } from '../store/product/productActions';


interface Props {
    reviews:Review[];
    productId:number;
}

const ReviewComponent: React.FC<Props> = ({ reviews, productId}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [newReview, setNewReview] = useState<string>('');
    const [rating, setRating] = useState<number>(2);

    const dispatch: Dispatch<any> = useDispatch();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(productId)
    const submitReview = () => {
        dispatch(addReviewToProductAction({ productId, reviewData: { content: newReview, rate:rating } }));
        setOpen(false);
    };

    const style = {
        position: 'sticky',
        margin: 'auto',
        width: '50%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Typography variant="h4">Reviews</Typography>
            {reviews.map((review) => (
                <Box key={review.id} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid grey', paddingBottom: 2, marginBottom: 2 }}>
                    <Avatar src={review.profile_image} sx={{ marginRight: 2 }}/>
                    <Box>
                        <Typography variant="subtitle1">{review.full_name}</Typography>
                        <Typography variant="body2">{review.content}</Typography>
                        <Rating name="read-only" value={review.rate} readOnly />
                    </Box>
                </Box>
            ))}
            <Button startIcon={<AddIcon />} onClick={handleOpen}>Add Review</Button>
            <Modal
                sx={{display: 'flex', justifyContent: 'center', alignItems:'center'}}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Write your review
                    </Typography>
                    <TextField
                        fullWidth
                        label="Your Review"
                        multiline
                        rows={4}
                        margin="normal"
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                    />
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                                if (newValue !== null) {
                                    setRating(newValue);
                                }
                            }}
                        />
                        <Button onClick={submitReview}>Submit</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default ReviewComponent;
