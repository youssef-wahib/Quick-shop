import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { CartItem } from "../App";
import useStore, { Counter } from "../store/Store";

type props = {
  item: CartItem;
};

const ProductCard: React.FC<props> = ({ item }) => {
  const store = useStore();
  const handleAddToCart = (
    itemCount: Counter[],
    selectedItem: CartItem
  ): void => {
    if (
      itemCount.find((itemList) => itemList.id === selectedItem.id) ===
      undefined
    )
      store.handleAddToCart(item);
    else {
      store.incrementCount(selectedItem.id);
      console.log(store.itemCount);
    }
  };
  return (
    <Card raised sx={{ maxWidth: "23.5vw" }}>
      <CardMedia
        component="img"
        height="250"
        image={item.image}
        alt={item.title}
      />
      <CardContent sx={{ paddingBottom: "0", minHeight: 430 }}>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          align="justify"
          color="text.secondary"
        >
          {item.description}
        </Typography>
        <Typography variant="h6" component="div">
          ${item.price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ padding: "0" }}>
        <Button
          sx={{ padding: "5", fontWeight: "bold", fontSize: 20 }}
          fullWidth
          onClick={() => {
            handleAddToCart(store.itemCount, item);
          }}
          size="medium"
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};
export default ProductCard;
