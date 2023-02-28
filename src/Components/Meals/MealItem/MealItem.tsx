import CartContext from "../../../context/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";

interface MealItemProps {
  name: string;
  description: string;
  price: number;
  id: string;
}

const MealItem = (props: MealItemProps) => {
  const cartCtx = useContext(CartContext);
  const addToCartHandler = (amount: number) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={classes.meal} key={props.id}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onSubmit={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
