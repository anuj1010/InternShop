import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [count, setCount] = useState(0);
  const [cartValue, setCartValue] = useState(0);

  useEffect(() => {
    setCount(cartItems.length);
    setCartValue(calculateTotal);
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((val) => [...val, item]);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };
  const clearCart = () => {
    setCartItems([]);
  };

  // console.log(cartItems);

  return (
    <UserContext.Provider
      value={{ loggedIn, setLoggedIn, addToCart, count, cartValue, clearCart }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
