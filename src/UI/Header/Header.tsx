import React from "react";
import logo from "../../assets/icons/logo.svg";
import cart from "../../assets/icons/cart.svg";
import "./Header.style.sass";

export default function Header() {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="logo"></img>
      </div>
      <div className="cart">
        <div className="cart-name">Корзина</div>
        <img src={cart} alt="cart"></img>
      </div>
    </header>
  );
}
