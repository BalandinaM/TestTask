import React, { Suspense } from 'react'
import App from './App'
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage404 from './ErrorPage404'
import { createRoot } from 'react-dom/client'
import { getProducts } from './services/api'
import { Catalog } from './catalog/catalog'
import { Cart } from './cart/cart'
import { Home } from './home/home'

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
          const Products = await getProducts();
          return Products;
        },
        HydrateFallback: () => <div>Загрузка каталога...</div>,
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
