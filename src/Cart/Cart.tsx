import React from "react";
import useStore from "../store/Store";

type counter = {
  id: number;
  count: number;
};

const Cart: React.FC = () => {
  const store = useStore();
  let handleExist = (
    itemCount: counter[],
    selectedItemId: number
  ): counter | undefined => {
    return itemCount.find((item) => item.id === selectedItemId);
  };

  return (
    <div>
      <h1> here is the cart</h1>
      {store?.shoppingCart?.map((item) => {
        return <div key={item.id}>{item.title}</div>;
      })}
    </div>
  );
};
export default Cart;
