import React from "react";
import GoodsCard from "../../../UI/GoodsCard.tsx/GoodsCard";

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
  addToCart: { (element: Goods, count: number): void };
  searchInCart: { (element: Goods): inCart | undefined };
  changeCount: { (element: inCart, count: number): void };
  isFilter?: boolean;
}

export default function ShoppingList({
  goodsList,
  changeCount,
  searchInCart,
  addToCart,
  isFilter
}: Props) {
  return (
    <>
      <div className="info"><p>Всего наименований: {goodsList.length}</p>{isFilter?<p>Применён фильтр дилеров</p>:<></>}</div>
      <div className="shopping-list">
        {goodsList.map((e) => (
          <GoodsCard
            mode="shop"
            key={e.id}
            goods={e}
            addToCart={addToCart}
            searchInCart={searchInCart}
            changeCount={changeCount}
          />
        ))}
      </div>
    </>
  );
}
