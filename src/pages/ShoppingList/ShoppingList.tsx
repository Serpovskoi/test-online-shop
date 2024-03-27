import React from "react";
import GoodsCard from "./GoodsCard.tsx/GoodsCard";
import "./ShoppingList.style.sass";

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
  goodsList: Goods[];
  cartList: inCart[];
  setCartList: any;
  addToCart: { (element: Goods, count: number): void };
  searchInCart: { (element: Goods): inCart | undefined };
  changeCount: { (element: inCart, count: number): void };
  changeIsCartVisible: any;
}

export default function ShoppingList({
  goodsList,
  cartList,
  setCartList,
  changeCount,
  searchInCart,
  addToCart,
  changeIsCartVisible,
}: Props) {
  return (
    <div className="shopping-list">
      {goodsList.map((e) => (
        <GoodsCard
          mode="shop"
          key={e.id}
          goods={e}
          addToCart={addToCart}
          searchInCart={searchInCart}
          changeCount={changeCount}
          changeIsCartVisible={changeIsCartVisible}
        />
      ))}
    </div>
  );
}
