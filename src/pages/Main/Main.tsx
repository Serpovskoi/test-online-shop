import React, { useEffect, useState } from "react";
import ShoppingList from "../ShoppingList/ShoppingList";
import Header from "../../UI/Header/Header";
import { Link, useSearchParams } from "react-router-dom";
import CartList from "../Cart/CartList/CartList";
import ArrowToRight from "../../UI/ArrowToRight/ArrowToRight";
import Cart from "../Cart/Cart";
import Shop from "../ShoppingList/Shop";

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
  isLoading: boolean;
  dealers: string[];
  cartList: inCart[];
  setCartList: { (cartList: inCart[]): void };
  totalPrice: number;
  setTotalPrice: { (totalPrice: number): void };
  isCartVisible: boolean;
}

export default function Main({
  goodsList,
  isLoading,
  dealers,
  cartList,
  isCartVisible,
  setCartList,
  setTotalPrice,
  totalPrice,
}: Props) {
  const [, setSearchParams] = useSearchParams({});
  const [, setUpdate] = useState<number>(Date.now());
  const store = window.localStorage;

  const handleChangeParams = (e: string[]) => {
    setSearchParams({ dealers: e.join(",") });
  };

  useEffect(() => {
    if (dealers.length > 0) handleChangeParams(dealers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCartVisible]);

  function searchInCart(element: Goods) {
    const findElemnt = cartList.find((e) => e.id === element.id);
    return findElemnt;
  }

  function changeCount(element: inCart, newCount: number) {
    const findElemnetIndex = cartList.findIndex((e) => e.id === element.id);
    if (findElemnetIndex >= 0) {
      let memo = cartList;
      memo[findElemnetIndex] = { ...memo[findElemnetIndex], count: newCount };
      setCartList(memo);
      store.setItem("cartList", JSON.stringify(memo));
      let total = 0;
      memo.forEach((e: inCart) => (total += e.price * e.count));
      setTotalPrice(+total.toFixed(2));
    }

    if (newCount === 0) {
      let memo = cartList;
      memo.splice(findElemnetIndex, 1);
      setCartList(memo);
      store.setItem("cartList", JSON.stringify(memo));
      let total = 0;
      memo.forEach((e: inCart) => (total += e.price * e.count));
      setTotalPrice(+total.toFixed(2));
    }
    setUpdate(Date.now());
  }

  function addToCart(element: Goods, count: number) {
    setCartList([...cartList, { ...element, count: count }]);
    store.setItem(
      "cartList",
      JSON.stringify([...cartList, { ...element, count: count }])
    );
    let total = 0;
    [...cartList, { ...element, count: count }].forEach(
      (e: inCart) => (total += e.price * e.count)
    );
    setTotalPrice(+total.toFixed(2));
  }
  function deleteAllFromCart() {
    setCartList([]);
    store.setItem("cartList", JSON.stringify([]));
    setTotalPrice(0);
  }

  function findTotalCartCount() {
    let total = 0;
    cartList.forEach((e: inCart) => (total += e.count));
    return total;
  }

  return (
    <div className="main">
      <Header isCartVisible={isCartVisible} cartCount={findTotalCartCount()} />
      <div className="goods-list">
        {isLoading ? (
          <div className="loading">Загрузка...</div>
        ) : isCartVisible ? (
          <Cart
            totalPrice={totalPrice}
            changeCount={changeCount}
            searchInCart={searchInCart}
            cartList={cartList}
            setCartList={setCartList}
            setUpdate={setUpdate}
            cartCount={findTotalCartCount()}
            deleteAllFromCart={deleteAllFromCart}
          />
        ) : (
          <Shop
            addToCart={addToCart}
            changeCount={changeCount}
            searchInCart={searchInCart}
            goodsList={goodsList}
          />
        )}
      </div>
      <footer>
        <div className="content"><p>© Online Shop 2024</p><p>Правовая информация</p></div>
      </footer>
    </div>
  );
}
