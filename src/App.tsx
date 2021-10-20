import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  Badge,
  CircularProgress,
  Grid,
  Drawer,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductCard from "./ItemCard/ProductCard";
import Cart from "./Cart/Cart";
import useStore, { Counter } from "./store/Store";
export type CartItem = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
};
const getProducts = async (): Promise<CartItem[]> => {
  return await (await fetch("https://fakestoreapi.com/products")).json();
};

export default function App() {
  const store = useStore();
  const [cartOpen, setCartOpen] = useState(false);
  const { data, isLoading, error } = useQuery<CartItem[]>(
    "products",
    getProducts
  );
  console.log(data);
  // const totalCartItems = (addedItems: Counter[]): number => {
  //   return addedItems === []
  //     ? 0
  //     : addedItems
  //         .map((addedItems) => addedItems.count)
  //         .reduce((acc, itemCount) => acc + itemCount, 0);
  // };
  const handleRemoveFromCart = (id: number) => null;

  if (isLoading)
    return (
      <Grid
        item
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 50,
        }}
      >
        <CircularProgress size={80} thickness={4} />
      </Grid>
    );
  if (error) return <h1>sth went wrong</h1>;
  return (
    <>
      <Drawer
        anchor={"right"}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      >
        <Cart />
      </Drawer>
      <IconButton onClick={() => setCartOpen(true)}>
        <Badge
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          badgeContent={store.countCartItems(store.itemCount)}
          color={"error"}
        >
          <ShoppingCartIcon fontSize={"large"} />
        </Badge>
      </IconButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id}>
            <ProductCard item={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
