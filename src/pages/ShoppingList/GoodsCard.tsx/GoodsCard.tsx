import React, { useState } from "react";
import Counter from "../../../UI/Counter/Counter";
import "./GoodsCard.style.sass";
import ArrowToRight from "../../../UI/ArrowToRight/ArrowToRight";

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
  goods: Goods;
  addToCart?: { (element: Goods, count: number): void };
  deleteFromCart?: { (): void };
  searchInCart: { (element: Goods): inCart | undefined };
  changeCount: { (element: inCart, count: number): void };
  mode: "cart" | "shop";
  changeIsCartVisible?: any;
}

export default function GoodsCard({
  goods,
  addToCart,
  searchInCart,
  changeCount,
  deleteFromCart,
  mode,
  changeIsCartVisible,
}: Props) {
  const elInCart: inCart | undefined = searchInCart(goods);
  const [counter, setCounter] = useState<number>(elInCart ? elInCart.count : 1);

  return (
    <div key={goods.id} className="goods">
      <div className="cover">
        <img
          src={"https://test-frontend.dev.int.perx.ru/" + goods.image}
          alt="Изображение товара"
        />
      </div>
      <div className="name">{goods.name}</div>
      <div className="price">{goods.price.toFixed(2)} $</div>
      {mode === "shop" ? (
        elInCart ? (
          <div className="interactive-container">
            <Counter
              value={counter}
              setValue={(e: number) => {
                changeCount(elInCart, e);
                setCounter(e);
              }}
            />
            <button onClick={changeIsCartVisible} className="add-to-cart">
              <ArrowToRight />
              <p>Корзина</p>
            </button>
          </div>
        ) : (
          <div className="interactive-container">
            <button
              onClick={() => {
                addToCart ? addToCart(goods, 1) : (() => {})();
              }}
              className="add-to-cart"
            >
              В корзину
            </button>
          </div>
        )
      ) : elInCart ? (
        <div className="interactive-container">
          <Counter
            value={counter}
            setValue={(e: number) => {
              changeCount(elInCart, e);
              setCounter(e);
            }}
          />
          <button
            onClick={() => (deleteFromCart ? deleteFromCart() : (() => {})())}
            className="delete-from-cart"
          >
            <p>Удалить</p>
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
