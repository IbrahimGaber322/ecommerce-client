import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/product/ProductCard";
import { Box, Button, Grid } from "@mui/material";
import {
  selectProducts,
  selectProductLoading,
  selectProductCount,
} from "../store/product/productSlice";
import { useSelector } from "react-redux";
import { searchProductsAction } from "../store/product/productActions";
import ProductsSidebar from "../components/product/ProductsSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useAppDispatch } from "../hooks/redux";
import Pagination from "../components/Pagination";

export interface Query {
  minPrice: string;
  maxPrice: string;
  minRating: string;
  maxRating: string;
  category: string;
}

export default function Products() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const loading = useSelector(selectProductLoading);
  const selectedProducts = useSelector(selectProducts);
  const count = useSelector(selectProductCount);

  const [page, setPage] = useState(1);

  const categoryParams = useMemo(
    () => ["electronics", "fashion", "books", "toys"],
    []
  );

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const currPath = useMemo(
    () => location.pathname.slice(1),
    [location.pathname]
  );
  const category = useMemo(
    () =>
      categoryParams.find(
        (category) =>
          category === currPath || searchParams.get("category") || undefined
      ),
    [currPath, categoryParams, searchParams]
  );

  const [query, setQuery] = useState<Query>({
    minPrice: searchParams.get("min_price") || "",
    maxPrice: searchParams.get("max_price") || "",
    minRating: searchParams.get("min_rating") || "",
    maxRating: searchParams.get("max_rating") || "",
    category: searchParams.get("category") || "",
  });

  useEffect(() => {
    const selectedCategory =
      currPath === "/products" ? searchParams.get("category") : category;
    const paramsData = {
      name: searchParams.get("name") || undefined,
      category: selectedCategory || undefined,
      minPrice: searchParams.get("min_price") || undefined,
      maxPrice: searchParams.get("max_price") || undefined,
      minRating: searchParams.get("min_rating") || undefined,
      maxRating: searchParams.get("max_rating") || undefined,
      page: searchParams.get("page") || "1",
    };
    dispatch(searchProductsAction(paramsData));
  }, [dispatch, searchParams, location.pathname, category, currPath]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", page.toString());

    navigate(`?${searchParams.toString()}`);
  }, [page]);

  if (loading) {
    return <Loading />;
  }
  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        <ProductsSidebar query={query} setQuery={setQuery} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid container spacing={3} sx={{ padding: "30px" }}>
          {selectedProducts.map((product, index) => (
            <Grid
              key={product.id}
              item
              display="flex"
              justifyContent="center"
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <ProductCard key={index} product={product} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Pagination
              pages={Math.ceil(count / 8)}
              page={page}
              setPage={setPage}
              eventsPerPage={8}
              eventsNumber={count}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
