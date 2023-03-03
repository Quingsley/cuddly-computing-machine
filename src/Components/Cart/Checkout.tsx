import React from "react";
import classes from "./Checkout.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is not valid").min(2),
  street: yup.string().required("Enter a valid street").min(2),
  city: yup.string().required("Enter a valid city").min(2),
  postalCode: yup.string().required("Enter a valid postal code").min(5).max(5),
});

interface FormValues {
  name: string;
  street: string;
  city: string;
  postalCode: string;
}

const Checkout = (props: {
  onCancel: () => void;
  onConfirm: (data: FormValues) => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  const confirmHandler: SubmitHandler<FormValues> = (data) => {
    props.onConfirm(data);
    reset();
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(confirmHandler)}>
      <div className={!errors.name ? classes.control : classes.invalid}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div className={!errors.street ? classes.control : classes.invalid}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" {...register("street")} />
        {errors.street && <p>{errors.street.message}</p>}
      </div>
      <div className={!errors.street ? classes.control : classes.invalid}>
        <label htmlFor="postalCode">Postal Code</label>
        <input type="text" id="postalCode" {...register("postalCode")} />
        {errors.postalCode && <p>{errors.postalCode.message}</p>}
      </div>
      <div className={!errors.city ? classes.control : classes.invalid}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" {...register("city")} />
        {errors.city && <p>{errors.city.message}</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
