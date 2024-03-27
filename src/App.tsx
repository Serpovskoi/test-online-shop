import React, { useEffect, useState } from "react";
import { getAllGoods, getGoodsById } from "./api/api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";

interface Props {
  dealers: string[];
}
interface Goods {
  name: string;
  id: string;
  price: number;
  image: string;
}

function App({ dealers }: Props) {
  const [cartList, setCartList] = useState([]);
  const [goodsList, setGoodsList] = useState<Goods[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log(dealers.length);
  async function getGoods() {
    setIsLoading(true);
    const answer =
      dealers.length > 0 ? await getGoodsById(dealers) : await getAllGoods();
    setGoodsList(answer);
    setIsLoading(false);
  }

  useEffect(() => {
    getGoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Main dealers={dealers} goodsList={goodsList} isLoading={isLoading}/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
/**/
