import { Paper } from "@mui/material";
import Hero from "../components/home/Hero";
import ProductCarosoul from "../components/home/ProductCarosoul";

const Home = () => {
  return (
    <>
      <Paper elevation={2}></Paper>
      <Hero />
      <ProductCarosoul/>
    </>
  );
};

export default Home;
