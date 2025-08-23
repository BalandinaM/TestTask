import React, { Suspense } from 'react'
import App from './App'
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage404 from './ErrorPage404'
import { createRoot } from 'react-dom/client'
import { getProductColor, getProducts, getSizes, getProduct } from './services/api'
import { Catalog } from './pages/catalog/catalog'
import { Cart } from './pages/cart/cart'
import { Home } from './pages/home/home'
import { ProductPage } from './pages/productPage/productPage';
//import { ListSizes } from './listSizes/listSizes'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage404 />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/catalog",
        element: <Catalog />,
        loader: async () => {
          const products = await getProducts();
          return products;
        },
        HydrateFallback: () => <div>Загрузка каталога...</div>,
      },
      {
        path: "/catalog/product/:productId/:colorId",
        element: <ProductPage />,
        loader: async ({params}) => {
          const productColor = await getProductColor(params.productId, params.colorId);
          const product = await getProduct(params.productId)
          const allSizes = await getSizes();
          return {
            productColor,
            allSizes,
            product
          };
        },
        HydrateFallback: () => <div>Загрузка страницы товара...</div>,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);


const rootElement = document.getElementById('root')

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Suspense fallback={<div>Загрузка приложения...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </React.StrictMode>
  );
}
