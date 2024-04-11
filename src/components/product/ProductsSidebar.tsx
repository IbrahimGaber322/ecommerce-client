import { Box } from "@mui/material";
import ProductsSidebarPrice from "./ProductsSidebarPrice";
import ProductsSidebarCategory from "./ProductsSidebarCategory";
import ProductsSidebarRating from "./ProductsSidebarRating";

export default function ProductsSidebar() {
  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        borderRight: "1px solid rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <ProductsSidebarPrice />
      <ProductsSidebarRating />
      <ProductsSidebarCategory />
    </Box>
  );
}
