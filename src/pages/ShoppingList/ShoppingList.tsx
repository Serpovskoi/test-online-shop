import React from "react";
import GoodsCard from "./GoodsCard.tsx/GoodsCard";
import "./ShoppingList.style.sass"

interface Goods {
  name: string;
  id: string;
  price: number;
  image: string;
}
interface Props {
  goodsList: Goods[];
}

export default function ShoppingList({ goodsList }: Props) {
  return (
    <div className="shopping-list">
      {goodsList.map((e) => (
        <GoodsCard goods={e}/>
      ))}
    </div>
  );
}
