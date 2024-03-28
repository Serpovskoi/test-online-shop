import React from "react";
import "./Cart.style.sass";
import CartList from "./CartList/CartList";
import ArrowToRight from "../../UI/ArrowToRight/ArrowToRight";
import { Link } from "react-router-dom";

interface Goods {
  name: string;
  id: string;
  price: number;
  image: string;
}

interface inCart {
  name: string;
  id: string;
  price: number;
  image: string;
  count: number;
}

interface Props {
  totalPrice: number;
  cartCount: number;
  cartList: inCart[];
  setCartList: { (update: inCart[]): void };
  setUpdate: { (update: number): void };
  searchInCart: { (element: Goods): inCart | undefined };
  changeCount: { (element: inCart, count: number): void };
  deleteAllFromCart: { (): void };
}

export default function Cart({
  totalPrice,
  cartCount,
  cartList,
  searchInCart,
  changeCount,
  setUpdate,
  deleteAllFromCart,
}: Props) {
  return cartList.length > 0 ? (
    <div className="cart">
      <div className="total">
        <div className="total-info">
          <div className="total-text">
            Итого :<p>{totalPrice}$</p>
          </div>
          <div className="total-text">
            Всего :<p>{cartCount}</p> товаров
          </div>
        </div>
        <div className="buttons">
          <button className="registration">Перейти к оформлению</button>
          <button onClick={deleteAllFromCart} className="delete-all">
            Удалить всё
          </button>
        </div>
      </div>
      <CartList
        cartList={cartList}
        searchInCart={searchInCart}
        changeCount={changeCount}
        setUpdate={setUpdate}
      />
    </div>
  ) : (
    <div className="oops">
      <p>В корзине нет товаров.</p>
      Закажите товары из каталога
      <Link to="/">
        <button>
          <p>В каталог</p>
          <ArrowToRight />
        </button>
      </Link>
    </div>
  );
}
