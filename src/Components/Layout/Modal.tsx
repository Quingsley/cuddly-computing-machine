import classes from "./Modal.module.css";
import { createPortal } from "react-dom";

const Modal = (props: { children: React.ReactNode; onClose: () => void }) => {
  const overlay = (
    <>
      <div className={classes.backdrop} onClick={props.onClose}></div>
      <div className={classes.modal}>
        <div className={classes["modal__content"]}>
          <button className={classes["modal__close"]} onClick={props.onClose}>
            <span className={classes["modal__close__icon"]}>&times;</span>
          </button>
          {props.children}
        </div>
      </div>
    </>
  );
  const portalElement = document.getElementById("modal")!;
  return createPortal(overlay, portalElement);
};

export default Modal;
