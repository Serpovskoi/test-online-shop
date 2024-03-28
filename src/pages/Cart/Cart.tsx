import React, { useEffect } from "react";
import "./Cart.style.sass";
import CartList from "./CartList/CartList";
import ArrowToRight from "../../UI/ArrowToRight/ArrowToRight";
import { Link, useSearchParams } from "react-router-dom";

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
  changeCount: { (element: inCart, count: number): void };
  deleteAllFromCart: { (): void };
}

export default function Cart({
  totalPrice,
  cartCount,
  cartList,
  changeCount,
  setUpdate,
  deleteAllFromCart,
}: Props) {
  const [, setSearchParams] = useSearchParams({});

  function changeWord(number: number, text: string[]) {
    const cases = [2, 0, 1, 1, 1, 2];
    return text[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }

  function searchInCart(element: Goods) {
    const findElemnt = cartList.find((e) => e.id === element.id);
    return findElemnt;
  }

  useEffect(() => {
    setSearchParams({});
    document.title = "Корзина — Online Shop"
  }, []);


  return cartList.length > 0 ? (
    <div className="cart">
      <div className="total">
        <div className="total-info">
          <div className="total-text">
            Итого :<p>{totalPrice}$</p>
          </div>
          <div className="total-text">
            Всего :<p>{cartCount}</p>{" "}
            {changeWord(cartCount, ["товар", "товара", "товаров"])}
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
