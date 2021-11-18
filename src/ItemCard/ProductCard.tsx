import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { CartItems } from "../AppTypes";
import useStore from "../store/Store";

type props = {
  readonly item: CartItems;
};

const ProductCard: React.FC<props> = ({ item }) => {
  const store = useStore();
  return (
    <Card raised sx={{ maxWidth: 350 }}>
      <CardMedia
        component="img"
        height="250"
        image={item.image}
        alt={item.title}
      />
      <CardContent sx={{ paddingBottom: "0", minHeight: 300 }}>
        <Typography gutterBottom variant="h6" component="div">
          {item.title}
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
            const exist = store.shoppingCart.find((piece) => {
              return piece.id === item.id;
            })?.count;
            exist
              ? store.incrementCount(item.id, item.price)
              : store.handleAddToCart(item);
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
