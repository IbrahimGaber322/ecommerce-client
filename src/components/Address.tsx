import React, { useState } from 'react';
import axios from 'axios';
import { Dispatch } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from 'react-redux';
import { getAddresses, addAddress } from '../store/address/addressActions';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

const Address: React.FC = () => {
    const [address, setAddress] = useState<string>('');
    const [mobileNumber, setMobileNumber] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [errors, setErrors] = useState<{ address: string; mobileNumber: string }>({ address: '', mobileNumber: '' });
    const dispatch: Dispatch<any> = useDispatch();

    const validateInput = (): boolean => {
        let hasError = false;
        let newErrors = { address: '', mobileNumber: '' };

        if (!address.trim()) {
            newErrors.address = 'Address is required';
            hasError = true;
        }

        if (!mobileNumber.trim()) {
            newErrors.mobileNumber = 'Mobile number is required';
            hasError = true;
        } else if (!/^\d{11}$/.test(mobileNumber)) {
            newErrors.mobileNumber = 'Invalid mobile number, must be 11 digits';
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateInput()) {
            console.log("Validation failed");
            return; 
        }

        console.log("Validation successful, proceed with form submission");

        const addressData = {
            address: address,
            mobile_number: mobileNumber,
            desc: description 
        };

        dispatch(addAddress(addressData));

        setAddress('');
        setMobileNumber('');
        setDescription('');
    }

    return (
        <Container component="main" maxWidth="sm" sx={{ width: '100%', padding: '16px' }}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: { xs: 2, sm: 3 },
                    borderRadius: 2,
                    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'background.paper',
                    width: '100%',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                    Add New Address
                </Typography>
                <form onSubmit={handleSubmit} noValidate>
                    <Box sx={{ width: '100%', '& .MuiTextField-root': { m: 1, width: '100%' } }}>
                        <TextField
                            required
                            label="Address"
                            error={!!errors.address}
                            helperText={errors.address}
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                                if (errors.address) {
                                    setErrors({ ...errors, address: '' });
                                }
                            }}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <LocationOnIcon color="action" />
                                ),
                            }}
                        />
                        <TextField
                            required
                            label="Mobile Number"
                            error={!!errors.mobileNumber}
                            helperText={errors.mobileNumber}
                            value={mobileNumber}
                            onChange={(e) => {
                                setMobileNumber(e.target.value);
                                if (errors.mobileNumber) {
                                    setErrors({ ...errors, mobileNumber: '' });
                                }
                            }}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <PhoneIcon color="action" />
                                ),
                            }}
                        />
                        <TextField
                            label="Description (optional)"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            variant="outlined"
                            multiline
                            rows={4}
                        />
                        <Box sx={{ mt: 3, mb: 5 }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default Address;
