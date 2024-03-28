import React, { useEffect } from "react";
import ShoppingList from "./ShoppingList/ShoppingList";
import "./Shop.style.sass";
import { useSearchParams } from "react-router-dom";

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
  dealers: string[];
  addToCart: { (element: Goods, count: number): void };
  changeCount: { (element: inCart, count: number): void };
  searchInCart: { (element: Goods): inCart | undefined };
}

export default function Shop({
  goodsList,
  dealers,
  changeCount,
  addToCart,
  searchInCart,
}: Props) {
  const [, setSearchParams] = useSearchParams({});

  const handleChangeParams = (e: string[]) => {
    setSearchParams({ dealers: e.join(",") });
  };

  useEffect(() => {
    if (dealers.length > 0) handleChangeParams(dealers);
  }, [dealers]);

  useEffect(()=>{document.title = "Online Shop"}, [])

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
