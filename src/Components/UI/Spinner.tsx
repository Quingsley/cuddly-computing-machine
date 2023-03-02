import React from "react";
import PropTypes from "prop-types";
import "./Spinner.css";

const Spinner = (props: { size: string }) => {
  const classNames = `Spinner Spinner--${props.size}`;
  return (
    <div className={classNames}>
      <div className="Spinner__loader"></div>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

Spinner.defaultProps = {
  size: "md",
};

export default Spinner;
