import Card from "../UI/Card";
import Spinner from "../UI/Spinner";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

interface MealObj {
  id: string;
  name: string;
  description: string;
  price: number;
}

const AvailableMeals = () => {
  const [meals, setMeals] = useState<Array<MealObj>>([] as Array<MealObj>);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState({
    message: "Something went wrong",
    hasError: false,
  });
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://elimisha-c5ce8-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
        );

        if (!response.ok) {
          setIsLoading(false);
          throw new Error("Something went wrong!");
        }
        const fetchedMeals = await response.json();
        setMeals(fetchedMeals);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setHttpError({ message: "Something went wrong", hasError: true });
      }
    };
    fetchMeals();
  }, []);
  if (isLoading) {
    return (
      <div className={classes["spinner-box"]}>
        <Spinner />
      </div>
    );
  }

  if (httpError.hasError) {
    return (
      <div className={classes["spinner-box"]}>
        <h1 className={classes.error}>{httpError.message}</h1>
      </div>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      id={meal.id}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
