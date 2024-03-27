import React, { useEffect, useState } from "react";
import ShoppingList from "../ShoppingList/ShoppingList";
import Header from "../../UI/Header/Header";
import { useSearchParams } from "react-router-dom";
import Cart from "../Cart/Cart";
import ArrowToRight from "../../UI/ArrowToRight/ArrowToRight";

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
}

export default function Main({
  goodsList,
  isLoading,
  dealers,
  cartList,
  setCartList,
  setTotalPrice,
  totalPrice,
}: Props) {
  const [, setSearchParams] = useSearchParams({});
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
  const [, setUpdate] = useState<number>(Date.now());

  const handleChangeParams = (e: string[]) => {
    setSearchParams({ dealers: e.join(",") });
  };

  useEffect(() => {
    if (dealers.length > 0) handleChangeParams(dealers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const store = window.localStorage;

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

  function findTotalCartCount() {
    let total = 0;
    cartList.forEach((e: inCart) => (total += e.count));
    return total;
  }

  return (
    <div className="main">
      <Header
        isCartVisible={isCartVisible}
        changeIsCartVisible={() => setIsCartVisible(!isCartVisible)}
        cartCount={findTotalCartCount()}
      />
      {isCartVisible ? (
        <div className="goods-list">
          {isLoading ? (
            <div className="loading">Загрузка...</div>
          ) : cartList.length > 0 ? (
            <Cart
              totalPrice={totalPrice}
              changeCount={changeCount}
              searchInCart={searchInCart}
              cartList={cartList}
              setCartList={setCartList}
              setUpdate={setUpdate}
            />
          ) : (
            <div className="oops">
              <p>В корзине нет товаров.</p>
              Закажите товары из каталога
              <button onClick={() => setIsCartVisible(!isCartVisible)}>
                <p>В каталог</p>
                <ArrowToRight />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="goods-list">
          {isLoading ? (
            <div className="loading">Загрузка...</div>
          ) : goodsList.length > 0 ? (
            <ShoppingList
              addToCart={addToCart}
              changeCount={changeCount}
              searchInCart={searchInCart}
              goodsList={goodsList}
              cartList={cartList}
              setCartList={setCartList}
              changeIsCartVisible={() => setIsCartVisible(!isCartVisible)}
            />
          ) : (
            <div className="oops">
              Упс! Что-то пошло не так. В списке нет товаров.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
