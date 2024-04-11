import React, { useState } from 'react';
import { Box, Button, Typography, Modal, TextField, Rating, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


interface Review {
    id: number;
    product: number;
    content: string;
    full_name: string;
    profile_image: string;
    rate:number;
}

interface Props {
    productId: number;
}

const dummyReviews: Review[] = [
    {
        id: 1,
        product: 101,
        content: "Great product, really loved it!",
        full_name: "John Doe",
        profile_image: "https://res.cloudinary.com/dgd0qz32l/image/upload/v1712772658/d4mjngfixjfs3tmyv1i8.jpg",
        rate: 5,  // Rating out of 5
    },
    {
        id: 2,
        product: 101,
        content: "It was okay, could be better.",
        full_name: "Jane Smith",
        profile_image: "https://res.cloudinary.com/dgd0qz32l/image/upload/v1712772658/d4mjngfixjfs3tmyv1i8.jpg",
        rate: 3,  // Rating out of 5
    },
    {
        id: 3,
        product: 101,
        content: "Didn't like it much, had some issues.",
        full_name: "Foo Bar",
        profile_image: "https://res.cloudinary.com/dgd0qz32l/image/upload/v1712772658/d4mjngfixjfs3tmyv1i8.jpg",
        rate: 2,  // Rating out of 5
    }
];


const ReviewComponent: React.FC<Props> = ({ productId }) => {
    const [reviews, setReviews] = useState<Review[]>(dummyReviews);
    const [open, setOpen] = useState<boolean>(false);
    const [newReview, setNewReview] = useState<string>('');
    const [rating, setRating] = useState<number>(2);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const submitReview = () => {
        // Submit logic
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Typography variant="h6">Reviews</Typography>
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
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
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
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                            if (newValue !== null) {
                                setRating(newValue);
                            }
                        }}
                    />
                    <Button onClick={submitReview} sx={{ mt: 2 }}>Submit</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default ReviewComponent;
