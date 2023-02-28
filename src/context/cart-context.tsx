import React from "react";
import CartModel from "../models/cart-model";

const CartContext = React.createContext({
  items: [] as CartModel[],
  totalAmount: 0,
  addItem: (item: CartModel) => {},
  removeItem: (id: string) => {},
});

export default CartContext;
