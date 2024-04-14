import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../store/address/addressActions";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { useAppDispatch } from "../hooks/redux";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { selectAddresses } from "../store/address/addressSlice";

const Addresses: React.FC = () => {
  const dispatch = useAppDispatch();
  const addresses = useSelector(selectAddresses);
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<{
    name: string;
    address: string;
    mobileNumber: string;
  }>({ name: "", address: "", mobileNumber: "" });
  const [expand, setExpand] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null); // Index of the address being edited

  const validateInput = (): boolean => {
    let hasError = false;
    let newErrors = { name: "", address: "", mobileNumber: "" };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      hasError = true;
    }

    if (!address.trim()) {
      newErrors.address = "Address is required";
      hasError = true;
    }

    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
      hasError = true;
    } else if (!/^\d{11}$/.test(mobileNumber)) {
      newErrors.mobileNumber = "Invalid mobile number, must be 11 digits";
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInput()) {
      return;
    }

    const addressData = {
      name: name,
      address: address,
      mobile_number: mobileNumber,
      desc: description,
    };

    if (editIndex !== null) {
      // If editIndex is not null, update existing address
      // Dispatch an action to update the address in the store
      dispatch(updateAddress({ ...addressData, id: addresses[editIndex].id }));
    } else {
      // If editIndex is null, add new address
      dispatch(addAddress(addressData));
    }

    setAddress("");
    setMobileNumber("");
    setDescription("");
    setExpand(false);
    setEditIndex(null);
  };

  const handleEdit = (index: number) => {
    const addressToEdit = addresses[index];
    setName(addressToEdit.name);
    setAddress(addressToEdit.address);
    setMobileNumber(addressToEdit.mobile_number);
    setDescription(addressToEdit.desc);
    setExpand(true);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    // Dispatch an action to delete the address at the given index
    dispatch(deleteAddress(addresses[index].id));
  };

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  return (
    <Container
      sx={{
        width: "100%",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 0,
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        sx={{ textAlign: "center", mb: 4 }}
      >
        Addresses
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Mobile Number</TableCell>
              <TableCell align="center">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addresses.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">{row.mobile_number}</TableCell>
                <TableCell align="center">{row.desc}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleEdit(index)}>Edit</Button>
                  <Button onClick={() => handleDelete(index)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {expand && (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: { xs: 2, sm: 3 },
            borderRadius: 2,
            boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.1)",
            backgroundColor: "background.paper",
            width: "100%",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Add New Address
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <Box
              sx={{
                width: "100%",
                "& .MuiTextField-root": { m: 1, width: "100%" },
              }}
            >
              <TextField
                required
                label="Name"
                error={!!errors.name}
                helperText={errors.name}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) {
                    setErrors({ ...errors, name: "" });
                  }
                }}
                variant="outlined"
              />
              <TextField
                required
                label="Address"
                error={!!errors.address}
                helperText={errors.address}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (errors.address) {
                    setErrors({ ...errors, address: "" });
                  }
                }}
                variant="outlined"
                InputProps={{
                  startAdornment: <LocationOnIcon color="action" />,
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
                    setErrors({ ...errors, mobileNumber: "" });
                  }
                }}
                variant="outlined"
                InputProps={{
                  startAdornment: <PhoneIcon color="action" />,
                }}
              />
              <TextField
                label="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                multiline
                rows={4}
              />
              <Box sx={{ mt: 3, mb: 5 }}>
                <Button type="submit" fullWidth variant="contained">
                  Submit
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      )}
      <Button
        variant="contained"
        onClick={() => setExpand(!expand)}
        sx={{ mt: 2 }}
      >
        {expand ? "Close" : "Add New Address"}
      </Button>
    </Container>
  );
};

export default Addresses;
