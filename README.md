# [Test-online-shop](https://test-online-shop.vercel.app/)

Реализация простого приложения интернет магазина.

Состоит из двух страниц: [Списка товаров](https://test-online-shop.vercel.app/) и [Корзины](https://test-online-shop.vercel.app/cart). Переход между страницами без перезагрузки.

Сохраняет ранее занесённые в корзину товары при перезагрузке.

Позволяет выбрать список интресующих дилеров изменением внешнего кода в файле [index.html](https://github.com/Serpovskoi/test-online-shop/blob/main/public/index.html) в массиве переменной initData [dealers](https://github.com/Serpovskoi/test-online-shop/blob/c4e84628b22e7b431d9fa6267bb0295e77470ced/public/index.html#L12C1-L12C40).

Также реализован функционал сортировки, множественного добавления и удаления. Небольшой адаптив под различные размеры экранов.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
