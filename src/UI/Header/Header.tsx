import React from "react";
import logo from "../../assets/icons/logo.svg";
import cart from "../../assets/icons/cart.svg";
import "./Header.style.sass";
import ArrowToRight from "../ArrowToRight/ArrowToRight";
import { Link } from "react-router-dom";
interface Props {
  isCartVisible: boolean;
  cartCount: number;
}

export default function Header({ isCartVisible, cartCount }: Props) {
  return (
    <header>
      <div className="content">
        <div className="logo">
          <img src={logo} alt="logo"></img>
        </div>
        <div className="cart">
          {isCartVisible ? (
            <Link to="/">
              <div className="cart-name">В каталог</div>
              <ArrowToRight />
            </Link>
          ) : (
            <Link to="/cart">
              <div className="cart-name">Корзина</div>
              <div className="cart-img">
                <img src={cart} alt="cart"></img>
                {cartCount > 0 ? (
                  <div className="circle-counter">
                    <p>{cartCount}</p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
