import create from "zustand";

import { CartItem } from "../App";
export type Counter = {
  readonly id: number;
  readonly count: number;
};

type Store = {
  readonly shoppingCart: CartItem[];
  readonly handleAddToCart: (selectedItem: CartItem) => void;
  readonly itemCount: Counter[];
  readonly countCartItems: (itemCount: Counter[]) => number;
  readonly incrementCount: (counterId: Counter["id"]) => void;
};

const useStore = create<Store>((set) => ({
  shoppingCart: [],
  itemCount: [],

  countCartItems: (addedItems) => {
    return addedItems
      .map((addedItems) => addedItems.count)
      .reduce((acc, itemCount) => acc + itemCount, 0);
  },
  handleAddToCart: (selectedItem) => {
    set((state) => ({
      shoppingCart: [...state.shoppingCart, selectedItem],
      itemCount: [...state.itemCount, { id: selectedItem.id, count: 1 }],
    }));
  },
  incrementCount: (counterId) => {
    set((state) => ({
      itemCount: state.itemCount.map((counter) =>
        counter.id === counterId
          ? { ...counter, count: counter.count + 1 }
          : counter
      ),
    }));
  },
}));
export default useStore;
