import React from 'react'
import {getProducts} from "./services/api"

export default function App() {
  const Products = getProducts();
  console.log(Products);


  return (
    <div className="App">
      <header className="App-header">
        <p>hello there</p>
      </header>
    </div>
  )
}
