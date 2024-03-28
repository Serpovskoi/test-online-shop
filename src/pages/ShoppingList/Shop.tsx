import React from "react";
import ShoppingList from "./ShoppingList";
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
}

export default function Shop({
  goodsList,
  changeCount,
  searchInCart,
  addToCart,
}: Props) {
  return (
    <>
      {goodsList.length > 0 ? (
        <ShoppingList
          addToCart={addToCart}
          changeCount={changeCount}
          searchInCart={searchInCart}
          goodsList={goodsList}
        />
      ) : (
        <div className="oops">
          Упс! Что-то пошло не так. В списке нет товаров.
        </div>
      )}
    </>
  );
}
