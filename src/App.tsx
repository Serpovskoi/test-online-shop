import React, { useEffect, useState } from "react";
import { getAllGoods, getGoodsById } from "./api/api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import "./App.style.sass";

interface Props {
  dealers: string[];
}
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

function App({ dealers }: Props) {
  const store = window.localStorage.getItem("cartList");
  const [cartList, setCartList] = useState<inCart[]>([]);
  const [goodsList, setGoodsList] = useState<Goods[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  async function getGoods() {
    setIsLoading(true);
    const answer =
      dealers.length > 0 ? await getGoodsById(dealers) : await getAllGoods();
    setGoodsList(answer);
    setIsLoading(false);
  }

  function checkStorage() {
    if (store) {
      const storeArr = JSON.parse(store);
      setCartList(storeArr);
      let total = 0;
      storeArr.forEach((e: inCart) => (total += e.price * e.count));
      setTotalPrice(+total.toFixed(2));
    }
  }

  useEffect(() => {
    getGoods();
    checkStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                cartList={cartList}
                setCartList={setCartList}
                dealers={dealers}
                goodsList={goodsList}
                isLoading={isLoading}
                setTotalPrice={setTotalPrice}
                totalPrice={totalPrice}
                isCartVisible={false}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Main
                cartList={cartList}
                setCartList={setCartList}
                dealers={dealers}
                goodsList={goodsList}
                isLoading={isLoading}
                setTotalPrice={setTotalPrice}
                totalPrice={totalPrice}
                isCartVisible={true}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
/**/
