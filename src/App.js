import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function App() {
  
  return (
    <div className="App">
      <header>
        <nav>
          <ul className='listNav'>
            <li><NavLink to="/">На главную</NavLink></li>
            <li><NavLink to="/catalog">Каталог</NavLink></li>
            <li><NavLink to="/cart">Корзина</NavLink></li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}
