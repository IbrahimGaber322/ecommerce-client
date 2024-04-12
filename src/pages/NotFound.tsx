import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const NotFound = () => {
  return (
   <Box margin="auto" width="80vw" height="80vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" position="relative"  >
      <Typography variant="h1" color="primary" sx={{position:"absolute", top:0}}>404</Typography>
      <img width="100%" height="100%" src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="404" />
      <Button sx={{position:"absolute", bottom:0}} variant="contained" color="primary" component={Link} to="/">
        Go back to Home
      </Button>
   </Box>
  );
};

export default NotFound;
