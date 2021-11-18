import React from "react";
import useStore from "../store/Store";
import {
  Typography,
  IconButton,
  Divider,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Container,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
const Cart: React.FC = () => {
  const store = useStore();

  return (
    <>
      <Container
        sx={{ paddingTop: 3, paddingBottom: 5, backgroundColor: "#FFFAF1" }}
      >
        <Typography align={"center"} variant={"h4"}>
          Your Shopping Cart
        </Typography>
        {store?.shoppingCart?.map((item) => {
          return (
            <Card
              key={item.id}
              elevation={2}
              sx={{ maxWidth: "20.5vw", paddingTop: 2, marginBottom: 2 }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.title}
                sx={{ alignItems: "center" }}
              />
              <CardContent>
                <Typography variant={"h5"} align={"center"}>
                  {item.title}
                </Typography>
                <Typography variant={"body1"}>
                  Price: ${item.price} Subtotal: ${item.price * item.count}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  onClick={() => store.incrementCount(item.id, item.price)}
                >
                  <AddCircleIcon />
                </IconButton>
                <Typography variant={"body1"}>{item.count}</Typography>
                <IconButton
                  onClick={() => {
                    item.count > 1
                      ? store.decrementCount(item.id, item.price)
                      : store.deleteItem(item.id, item.count, item.price);
                  }}
                >
                  <RemoveCircleIcon />
                </IconButton>
                <Button
                  variant={"contained"}
                  disableElevation
                  onClick={() =>
                    store.deleteItem(item.id, item.count, item.price)
                  }
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          );
        })}
        <Divider />
        <Typography variant={"h5"}>
          Total: ${store.totalPay.toFixed(2)}
        </Typography>
      </Container>
    </>
  );
};
export default Cart;
