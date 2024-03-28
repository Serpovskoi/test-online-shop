import React, { useEffect, useState } from "react";
import Header from "../../UI/Header/Header";
import { useSearchParams } from "react-router-dom";
import Cart from "../Cart/Cart";
import Shop from "../Shop/Shop";
import "./Main.style.sass";
import Footer from "../../UI/Footer/Footer";

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
  isCartVisible: boolean;
  totalPrice: number;
  setCartList: { (cartList: inCart[]): void };
  setTotalPrice: { (totalPrice: number): void };
}

export default function Main({
  goodsList,
  isLoading,
  dealers,
  cartList,
  isCartVisible,
  totalPrice,
  setCartList,
  setTotalPrice,
}: Props) {
  const [, setSearchParams] = useSearchParams({});
  const [, setUpdate] = useState<number>(Date.now());
  const store = window.localStorage;

  const handleChangeParams = (e: string[]) => {
    setSearchParams({ dealers: e.join(",") });
  };

  function changeCount(element: inCart, newCount: number) {
    const findElemnetIndex = cartList.findIndex((e) => e.id === element.id);
    if (findElemnetIndex >= 0) {
      const memo = cartList;
      memo[findElemnetIndex] = { ...memo[findElemnetIndex], count: newCount };
      setCartList(memo);
      store.setItem("cartList", JSON.stringify(memo));
      let total = 0;
      memo.forEach((e: inCart) => (total += e.price * e.count));
      setTotalPrice(+total.toFixed(2));
    }

    if (newCount === 0) {
      const memo = cartList;
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
    const memo = [...cartList, { ...element, count: count }];
    setCartList(memo);
    store.setItem("cartList", JSON.stringify(memo));
    let total = 0;
    memo.forEach((e: inCart) => (total += e.price * e.count));
    setTotalPrice(+total.toFixed(2));
    setUpdate(Date.now());
  }

  function deleteAllFromCart() {
    setCartList([]);
    store.setItem("cartList", JSON.stringify([]));
    setTotalPrice(0);
    setUpdate(Date.now());
  }

  function findTotalCartCount() {
    let total = 0;
    cartList.forEach((e: inCart) => (total += e.count));
    return total;
  }

  function searchInCart(element: Goods) {
    const findElemnt = cartList.find((e) => e.id === element.id);
    return findElemnt;
  }

  function sortByPrice(direct: boolean) {
    if (direct === false) {
      goodsList.sort((a, b) => a.price - b.price);
    } else {
      goodsList.sort((a, b) => b.price - a.price);
    }
        setUpdate(Date.now());
  }

  function sortByName(direct: boolean) {
    if (direct === false) {
      goodsList.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      goodsList.sort((a, b) => b.name.localeCompare(a.name))
    }
        setUpdate(Date.now());
  }

  useEffect(() => {
    if (dealers.length > 0) handleChangeParams(dealers);
  }, [isCartVisible]);

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
            dealers={dealers}
            sortByPrice={sortByPrice}
            sortByName={sortByName}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
