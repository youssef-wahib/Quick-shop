import create from "zustand";

import { CartItems } from "../AppTypes";

type Store = {
  readonly shoppingCart: CartItems[];
  readonly handleAddToCart: (selectedItem: CartItems) => void;
  readonly incrementCount: (
    counterId: CartItems["id"],
    price: CartItems["price"]
  ) => void;
  readonly decrementCount: (
    counterId: CartItems["id"],
    price: CartItems["price"]
  ) => void;
  readonly itemCount: number;
  readonly deleteItem: (
    itemId: CartItems["id"],
    removed: CartItems["count"],
    price: CartItems["price"]
  ) => void;
  readonly totalPay: number;
};

const useStore = create<Store>((set) => ({
  shoppingCart: [],
  itemCount: 0,
  totalPay: 0,
  handleAddToCart: (selectedItem) => {
    selectedItem.count = 1;
    set((state) => ({
      shoppingCart: [...state.shoppingCart, selectedItem],
      itemCount: state.itemCount + 1,
      totalPay: state.totalPay + selectedItem.price,
    }));
  },
  incrementCount: (counterId, price) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.map((counter) =>
        counter.id === counterId
          ? { ...counter, count: counter.count + 1 }
          : counter
      ),
      itemCount: state.itemCount + 1,
      totalPay: state.totalPay + price,
    }));
  },
  decrementCount: (counterId, price) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.map((counter) =>
        counter.id === counterId
          ? { ...counter, count: counter.count - 1 }
          : counter
      ),
      itemCount: state.itemCount - 1,
      totalPay: state.totalPay - price,
    }));
  },
  deleteItem: (itemId, removed, price) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.filter((items) => {
        return items.id !== itemId;
      }),
      itemCount: state.itemCount - removed,
      totalPay: state.totalPay - price * removed,
    }));
  },
}));
export default useStore;
