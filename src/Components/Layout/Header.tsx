import classes from "./Header.module.css";
import mealImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props: { onOpen: () => void }) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Pika Meals</h1>
        <HeaderCartButton onOpen={props.onOpen} />
      </header>
      <div className={classes["main-image"]}>
        <img
          src={mealImage}
          alt="A table full of delicious meals"
          srcSet={mealImage}
        />
      </div>
    </>
  );
};

export default Header;
