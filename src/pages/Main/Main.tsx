import React, { useEffect } from 'react'
import ShoppingList from '../ShoppingList/ShoppingList'
import Header from '../../UI/Header/Header'
import { useSearchParams } from 'react-router-dom';

interface Goods {
  name: string;
  id: string;
  price: number;
  image: string;
}
interface Props {
  goodsList: Goods[];
  isLoading: boolean;
  dealers: string[]
}

export default function Main({goodsList, isLoading, dealers}:Props) {
  const [, setSearchParams] = useSearchParams({});

  const handleChangeParams = (e: string[]) => {
    setSearchParams({ dealers: e.join(',') });
  };

  useEffect(() => {
    if (dealers.length > 0) handleChangeParams(dealers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Header />
      <div className="goods-list">
        {isLoading ? (
          <div className="loading">Загрузка...</div>
        ) : goodsList.length > 0 ? (
          <ShoppingList goodsList={goodsList} />
        ) : (
          <div className="oops">
            Упс! Что-то пошло не так. В списке нет товаров.
          </div>
        )}
      </div></div>
  )
}
