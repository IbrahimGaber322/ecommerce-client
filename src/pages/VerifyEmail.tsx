import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks/redux";
import { useParams } from "react-router-dom";
import { verifyEmailAction } from "../store/auth/authActions";

const VerifyEmail = () => {
  const { token } = useParams();
  const dispatch = useAppDispatch();
  const handleCLick = () => {
    dispatch(verifyEmailAction(token));
  };
  useEffect(() => {
    if (token) {
      dispatch(verifyEmailAction(token));
    }
  }, [dispatch, token]);

  return token ? (
    <Box
      height={600}
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Paper>
        <Typography>You will be redirected automatically, if not:</Typography>
        <Button onClick={handleCLick}>Click here to confirm email</Button>
      </Paper>
    </Box>
  ) : (
    <Box
      height={600}
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Paper>
        <Typography>
          Please check the conformation email in your mailbox.
        </Typography>
      </Paper>
    </Box>
  );
};

export default VerifyEmail;
