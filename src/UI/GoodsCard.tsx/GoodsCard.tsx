import React, { useState } from "react";
import Counter from "../Counter/Counter";
import "./GoodsCard.style.sass";
import ArrowToRight from "../ArrowToRight/ArrowToRight";
import { Link } from "react-router-dom";

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
  mode: "cart" | "shop";
  addToCart?: { (element: Goods, count: number): void };
  deleteFromCart?: { (): void };
  searchInCart: { (element: Goods): inCart | undefined };
  changeCount: { (element: inCart, count: number): void };
}

export default function GoodsCard({
  goods,
  mode,
  addToCart,
  searchInCart,
  changeCount,
  deleteFromCart,
}: Props) {
  const elInCart: inCart | undefined = searchInCart(goods);
  const [counter, setCounter] = useState<number>(elInCart ? elInCart.count : 1);

  function changeCounter(newCount: number) {
    setCounter(newCount === 0 ? 1 : newCount);
  }

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
                changeCounter(e);
              }}
            />
            <Link to="/cart">
              <button className="add-to-cart">
                <ArrowToRight />
                <p>Корзина</p>
              </button>
            </Link>
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
              changeCounter(e);
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
