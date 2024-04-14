import { Box, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import responsive from "./responsive";
import Electronics from "../../assets/images/Electronics.jpeg";
import Fashion from "../../assets/images/Fashion.jpg";
import Books from "../../assets/images/Books.jpg";
import Toys from "../../assets/images/Toys.jpg";

const topCategories = [
  { name: "Electronics", image: Electronics },
  { name: "Fashion", image: Fashion },
  { name: "Books", image: Books },
  { name: "Toys", image: Toys },
];

const TopCategories = () => {
  return (
    <Box sx={{ mt: "2rem", p: "1rem" }}>
      <Carousel responsive={responsive} infinite={true}>
        {topCategories?.map((category, index) => {
          return (
            <Box
              component={Link}
              to={`/${category.name.toLowerCase()}`}
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                borderRadius: 8,
                margin: "1rem",
                textDecoration: "none",
                ":hover": {
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <img
                src={category.image}
                alt={category.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
              <Typography variant="h6" color="secondary" align="center">
                {category.name}
              </Typography>
            </Box>
          );
        })}
      </Carousel>
    </Box>
  );
};

export default TopCategories;
