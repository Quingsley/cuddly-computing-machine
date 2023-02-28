import { useState } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Modal from "./Components/Layout/Modal";
import Meals from "./Components/Meals/Meals";
import CartProvider from "./context/CartProvider";
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      <Header onOpen={showCartHandler} />
      <Meals />
      {cartIsShown && (
        <Modal onClose={hideCartHandler}>
          <Cart onClose={hideCartHandler} />
        </Modal>
      )}
    </CartProvider>
  );
}

export default App;
