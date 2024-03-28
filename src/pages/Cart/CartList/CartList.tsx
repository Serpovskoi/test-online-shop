import React from "react";
import GoodsCard from "../../ShoppingList/GoodsCard.tsx/GoodsCard";

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
  setUpdate: { (update: number): void };
  searchInCart: { (element: Goods): inCart | undefined };
  changeCount: { (element: inCart, count: number): void };
}

export default function CartList({
  cartList,
  searchInCart,
  changeCount,
  setUpdate,
}: Props) {
  return (
    <>
      <div className="cart-list">
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
    </>
  );
}
