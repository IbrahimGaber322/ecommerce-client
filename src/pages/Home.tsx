import { Paper } from "@mui/material";
import React from "react";
import Hero from "../components/Hero";
import TopRated from "../components/TopRated";

const Home = () => {
  return (
    <>
      <Paper elevation={2}></Paper>
      <Hero></Hero>
      <TopRated></TopRated>
    </>
  );
};

export default Home;
