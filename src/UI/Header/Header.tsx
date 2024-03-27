import React from "react";
import logo from "../../assets/icons/logo.svg";
import cart from "../../assets/icons/cart.svg";
import "./Header.style.sass";
import ArrowToRight from "../ArrowToRight/ArrowToRight";
interface Props {
  changeIsCartVisible: { (): void };
  isCartVisible: boolean;
  cartCount: number;
}

export default function Header({
  changeIsCartVisible,
  isCartVisible,
  cartCount,
}: Props) {
  return (
    <header>
      <div className="content">
        <div className="logo">
          <img src={logo} alt="logo"></img>
        </div>
        <div onClick={changeIsCartVisible} className="cart">
          {isCartVisible ? (
            <>
              <div className="cart-name">В каталог</div>
              <ArrowToRight />
            </>
          ) : (
            <>
              <div className="cart-name">Корзина</div>
              <div className="cart-img">
                <img src={cart} alt="cart"></img>
                {cartCount > 0 ? (
                  <div className="circle-counter"><p>{cartCount}</p></div>
                ) : (
                  <></>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
