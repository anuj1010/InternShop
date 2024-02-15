import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { UserContext } from "../Context/UserContext";
import Cookies from "js-cookie";

const NavBar = () => {
  const { loggedIn, setLoggedIn, count, cartValue, clearCart } =
    useContext(UserContext);

  const handleLogout = () => {
    Cookies.remove("AuthToken");
    setLoggedIn(false);
  };

  const handleClearCart = () => {
    clearCart();
  };

  // console.log(loggedIn);

  return (
    <nav className="navbar">
      <div className="navbar-brand">InternShop</div>
      <ul className="navbar-menu">
        {loggedIn && (
          <>
            <li className="navbar-item">
              <div className="cart">
                Cart
                <span className="cart-count">{count}</span>
              </div>
              <div className="cartValue">$: {cartValue}</div>
            </li>
            <li className="navbar-item">
              <button className="clearButton" onClick={handleClearCart}>
                Clear-Cart
              </button>
            </li>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
