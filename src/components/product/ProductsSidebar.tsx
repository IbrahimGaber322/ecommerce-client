import { Box, Button } from "@mui/material";
import ProductsSidebarPrice from "./ProductsSidebarPrice";
import ProductsSidebarCategory from "./ProductsSidebarCategory";
import ProductsSidebarRating from "./ProductsSidebarRating";
import { Query } from "../../pages/Products";
import { Dispatch, SetStateAction } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProductsSidebar({
  query,
  setQuery,
}: {
  query: Query;
  setQuery: Dispatch<SetStateAction<Query>>;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const filter = () => {
    const searchParams = new URLSearchParams(location.search);
    query.minPrice
      ? searchParams.set("min_price", query.minPrice)
      : searchParams.delete("min_price");
    query.maxPrice
      ? searchParams.set("max_price", query.maxPrice)
      : searchParams.delete("max_price");
    query.minRating
      ? searchParams.set("min_rating", query.minRating)
      : searchParams.delete("min_rating");
    query.maxRating
      ? searchParams.set("max_rating", query.maxRating)
      : searchParams.delete("max_rating");
    query.category
      ? searchParams.set("category", query.category)
      : searchParams.delete("category");
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        borderRight: { xs: "0", md: "1px solid rgba(0,0,0,0.2)" },
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <ProductsSidebarPrice query={query} setQuery={setQuery} />
      <ProductsSidebarRating query={query} setQuery={setQuery} />
      {location.pathname === "/products" && (
        <ProductsSidebarCategory query={query} setQuery={setQuery} />
      )}
      <Button
        onClick={filter}
        variant="contained"
        color="primary"
        sx={{ mt: 2, width: "100%" }}
      >
        Filter
      </Button>
    </Box>
  );
}
