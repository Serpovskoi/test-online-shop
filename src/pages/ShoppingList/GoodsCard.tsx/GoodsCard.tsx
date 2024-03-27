import React from "react";
interface Goods {
  name: string;
  id: string;
  price: number;
  image: string;
}
interface Props {
  goods: Goods;
}
export default function GoodsCard({ goods }: Props) {
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
      <button className="add-to-cart">В корзину</button>
    </div>
  );
}
