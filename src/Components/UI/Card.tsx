import classes from "./Card.module.css";
interface CardProps {
  children: React.ReactNode;
}

const Card = (props: CardProps) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
