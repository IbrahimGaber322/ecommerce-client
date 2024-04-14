import { Paper, Typography } from "@mui/material";
import Hero from "../components/home/Hero";
import ProductCarosoul from "../components/home/ProductCarosoul";
import TopCategories from "../components/home/TopCategories";
import Testimonials from "../components/home/Testimonials";
const Home = () => {
  return (
    <>
      <Hero />
      <Typography
        color="primary"
        variant="h4"
        align="center"
        sx={{ mt: "2rem" }}
      >
        Top Categories
      </Typography>
      <Paper sx={{ mt: "2rem", p: "1rem" }}>
        <TopCategories />
      </Paper>
      <Typography
        color="primary"
        variant="h4"
        align="center"
        sx={{ mt: "2rem" }}
      >
        Popular Products
      </Typography>
      <ProductCarosoul />
      <Typography
        color="primary"
        variant="h4"
        align="center"
        sx={{ mt: "2rem" }}
      >
        Testimonials
      </Typography>
      <Paper sx={{ mt: "2rem", p: "1rem" }}>
        <Testimonials />
      </Paper>
    </>
  );
};

export default Home;
