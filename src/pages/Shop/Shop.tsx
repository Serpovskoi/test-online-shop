import React, { useEffect, useState } from "react";
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
  sortByPrice: { (direct: boolean): void };
  sortByName: { (direct: boolean): void };
}

export default function Shop({
  goodsList,
  dealers,
  changeCount,
  addToCart,
  searchInCart,
  sortByPrice,
  sortByName,
}: Props) {
  const [, setSearchParams] = useSearchParams({});
  const [priceSortFlag, setPriceSortFlag] = useState<boolean>(false);
  const [isSortedPrice, setIsSortedPrice] = useState<boolean>(false);
  const [nameSortFlag, setNameSortFlag] = useState<boolean>(false);
  const [isSortedName, setIsSortedName] = useState<boolean>(false);

  const handleChangeParams = (e: string[]) => {
    setSearchParams({ dealers: e.join(",") });
  };

  useEffect(() => {
    if (dealers.length > 0) handleChangeParams(dealers);
  }, [dealers]);

  useEffect(() => {
    document.title = "Online Shop";
  }, []);

  return (
    <>
      {goodsList.length > 0 ? (
        <>
            <div className="buttons-sort">
              <button
                style={isSortedPrice ? { fontWeight: "bold" } : {}}
                onClick={() => {
                  sortByPrice(priceSortFlag);
                  setPriceSortFlag(!priceSortFlag);
                  setIsSortedPrice(true);
                  setIsSortedName(false);
                }}
              >
                по цене
                {isSortedPrice ? (
                  <svg
                    style={
                      priceSortFlag ? {transform: "rotate(0.5turn)"} : {  }
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="#656565"
                  >
                    <path d="M0 6h4v2H0zm0-3h6v2H0zm0-3h8v2H0z" />
                  </svg>
                ) : (
                  <></>
                )}
              </button>
              <button
                style={isSortedName ? { fontWeight: "bold" } : {}}
                onClick={() => {
                  sortByName(nameSortFlag);
                  setNameSortFlag(!nameSortFlag);
                  setIsSortedPrice(false);
                  setIsSortedName(true);
                }}
              >
                по наименованию
                {isSortedName ? (
                  <svg
                    style={nameSortFlag ? {transform: "rotate(0.5turn)"} : {  }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="#656565"
                  >
                    <path d="M0 6h4v2H0zm0-3h6v2H0zm0-3h8v2H0z" />
                  </svg>
                ) : (
                  <></>
                )}
              </button>
            </div>

          <ShoppingList
            addToCart={addToCart}
            changeCount={changeCount}
            searchInCart={searchInCart}
            goodsList={goodsList}
            isFilter={dealers.length > 0 ? true : false}
          />
        </>
      ) : (
        <div className="oops">
          Упс! Что-то пошло не так. В списке нет товаров.
        </div>
      )}
    </>
  );
}
