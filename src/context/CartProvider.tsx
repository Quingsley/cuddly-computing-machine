import { useReducer } from "react";
import CartModel from "../models/cart-model";
import CartContext from "./cart-context";

interface CartProvidertProps {
  children: React.ReactNode;
}
enum Action {
  add = "ADD",
  remove = "REMOVE",
}

type typeCartState = {
  items: Array<CartModel>;
  totalAmount: number;
};

const defaultCartState: typeCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (
  state: typeCartState,
  action: { type: Action; item: CartModel }
) => {
  if (action.type === Action.add) {
    let updatedItems;
    let updatedAmount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingCartItemIndex];
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
      updatedAmount =
        state.totalAmount + action.item.price * action.item.amount;
    } else {
      updatedItems = state.items.concat(action.item);
      updatedAmount =
        state.totalAmount + action.item.price * action.item.amount;
    }
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  if (action.type === Action.remove) {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingCartItemIndex];
    if (existingItem) {
      const updatedAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.item.id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return {
        items: updatedItems,
        totalAmount: updatedAmount,
      };
    }
  }
  return defaultCartState;
};

const CartProvider = (props: CartProvidertProps) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addCartItemHandler = (item: CartModel) => {
    dispatchCartState({ type: Action.add, item: item });
  };
  const removeItemHandler = (id: string) => {
    dispatchCartState({
      type: Action.remove,
      item: { id: id, name: "", price: 0, amount: 0 },
    });
  };
  const ctxObj = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addCartItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={ctxObj}>{props.children}</CartContext.Provider>
  );
};

export default CartProvider;
