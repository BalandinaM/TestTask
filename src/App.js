import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { CartContext } from './CartContext';

export default function App() {
  const cart = useContext(CartContext);
  
  return (
    <div className="App">
      <header>
        <nav>
          <ul className='listNav'>
            <li><NavLink to="/">На главную</NavLink></li>
            <li><NavLink to="/catalog">Каталог</NavLink></li>
            <li>
              <NavLink to="/cart">Корзина {cart.items.length ? <span>{cart.items.length} товаров</span> : <span>пока пуста</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}
