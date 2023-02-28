import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props: {
  id: string;
  onSubmit: (arg1: number) => void;
}) => {
  const enteredAmount = useRef<HTMLInputElement>(null);

  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const amount = enteredAmount.current?.value;
    const convertedAmount = +amount!;
    if (
      convertedAmount === 0 ||
      convertedAmount > 5 ||
      convertedAmount < 1 ||
      amount?.trim().length === 0
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onSubmit(convertedAmount);
    enteredAmount.current!.value = "1";
    setAmountIsValid(true);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label={"Amount"}
        ref={enteredAmount}
        input={{
          id: `amount_${props.id}`,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      {!amountIsValid && <p className={classes.onError}>Invalid amount(1-5)</p>}
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
