import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  Badge,
  CircularProgress,
  Grid,
  Drawer,
  IconButton,
  Container,
  AppBar,
  CssBaseline,
  Button,
  Toolbar,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductCard from "./ItemCard/ProductCard";
import Cart from "./Cart/Cart";
import useStore from "./store/Store";
import { CartItems } from "./AppTypes";
import axios from "axios";

export default function App() {
  const store = useStore();
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState<string>("products");

  const { data, isLoading, error } = useQuery(
    category,
    (category): Promise<CartItems[]> => {
      return axios
        .get(`https://fakestoreapi.com/${category.queryKey[0]}`)
        .then((response) => response.data);
    }
  );
  if (isLoading)
    return (
      <Grid
        item
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 50,
        }}
      >
        <CircularProgress size={80} thickness={4} />
      </Grid>
    );
  if (error) return <h1>sth went wrong</h1>;
  return (
    <Box sx={{ backgroundColor: "#FFFAF1" }}>
      <CssBaseline />
      <Drawer
        anchor={"right"}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      >
        <Cart />
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <Button
            onClick={() => {
              setCategory("products");
            }}
            variant={"contained"}
            disableElevation={true}
          >
            Home
          </Button>

          <Button
            onClick={() => {
              setCategory("products/category/jewelery");
            }}
            variant={"contained"}
            disableElevation={true}
          >
            Jewelery
          </Button>

          <Button
            onClick={() => {
              setCategory("products/category/electronics");
            }}
            variant={"contained"}
            disableElevation={true}
          >
            Electronics
          </Button>

          <Button
            onClick={() => {
              setCategory("products/category/men's clothing");
            }}
            variant={"contained"}
            disableElevation={true}
          >
            Men's Clothing
          </Button>

          <Box
            sx={{ flexGrow: 1, justifyContent: "flex-end", display: "flex" }}
          >
            <IconButton onClick={() => setCartOpen(true)}>
              <Badge
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                badgeContent={store.itemCount}
                color={"error"}
              >
                <ShoppingCartIcon fontSize={"large"} />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 2 }}>
        <Grid
          container
          spacing={{ xs: 6, sm: 6, md: 4, lg: 4 }}
          columns={{ xs: 12, sm: 12, md: 3, lg: 6 }}
          justifyContent="center"
          alignItems="center"
        >
          {data?.map((item) => (
            <Grid item key={item.id} lg={2} md={1}>
              <ProductCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
