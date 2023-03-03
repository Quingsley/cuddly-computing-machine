import classes from "./Cart.module.css";
import { useContext } from "react";
import CartContext from "../../context/cart-context";
import CartItem from "./CartItem";
import CartModel from "../../models/cart-model";
import Checkout from "./Checkout";
import { useState } from "react";

const Cart = (props: { onClose: () => void }) => {
  const cartCtx = useContext(CartContext);

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onAddHandler = (item: CartModel) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const onRemoveHandler = (id: string) => {
    cartCtx.removeItem(id);
  };
  const isCheckoutHandler = () => {
    setIsCheckout(true);
  };

  const checkoutHandler = async (data: {
    name: string;
    street: string;
    city: string;
    postalCode: string;
  }) => {
    try {
      setIsSubmitting(true);
      await fetch(
        "https://elimisha-c5ce8-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: data,
            orderedItems: cartCtx.items,
          }),
        }
      );
      setIsSubmitting(false);
      cartCtx.clearCart();
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={onRemoveHandler.bind(null, item.id)}
            onAdd={onAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );
  const amount = `$ ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartContent = (
    <div>
      {cartItems}
      <div className={classes.total}>
        <span>Total</span>
        <span>{amount}</span>
      </div>
      <div className={classes.actions}>
        {hasItems && isCheckout && (
          <Checkout onConfirm={checkoutHandler} onCancel={props.onClose} />
        )}
        {hasItems && !isCheckout && (
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
        )}
        {hasItems && !isCheckout && (
          <button className={classes.button} onClick={isCheckoutHandler}>
            Order
          </button>
        )}
      </div>
    </div>
  );
  const spinner = <p>Sending Data...</p>;
  return isSubmitting ? spinner : cartContent;
};

export default Cart;
