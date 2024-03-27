import React, { useEffect } from "react";
import GoodsCard from "../ShoppingList/GoodsCard.tsx/GoodsCard";
import "./Cart.style.sass";

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
  cartList: inCart[];
  setCartList: { (update: inCart[]): void };
  setUpdate: { (update: number): void };
  searchInCart: { (element: Goods): inCart | undefined };
  changeCount: { (element: inCart, count: number): void };
  totalPrice: number;
}

export default function Cart({
  cartList,
  searchInCart,
  changeCount,
  setUpdate,
  totalPrice,
}: Props) {
  return (
    <>
      <div className="cart">
        {cartList.map((e) => (
          <GoodsCard
            mode="cart"
            key={e.id}
            goods={e}
            deleteFromCart={() => {
              changeCount(e, 0);
              setUpdate(Date.now());
            }}
            searchInCart={searchInCart}
            changeCount={changeCount}
          />
        ))}
      </div>
      <div className="total">
        <div className="total-text">Итого :<p>{totalPrice}$</p></div>
        <button>Перейти к оформлению</button>
      </div>
    </>
  );
}
