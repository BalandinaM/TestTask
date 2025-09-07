import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../CartContext";

export const Cart = () => {
  const cart = useContext(CartContext);
  const [productsInCart, setProductsCart] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      if (cart.items.length > 0) {
        const result = await cart.getProductsForCart(cart.items);
        setProductsCart(result);
      } else {
        setProductsCart([]);
      }
    };
    loadProducts();
  }, [cart, cart.items]);

  const TotalPrice = productsInCart.reduce((acc, item) => {
    return acc + Number(item.price)
  }, 0);

  return (
    productsInCart.length > 0 ? (
    <div>
      <ul className="cart_list">
        {productsInCart.map((item) => (
          <li className="cart_item" key={item.cartId} >
            <img
              src={item.image}
              alt={`${item.description}`}
              width={50}
              height={75}
            />
            <h3>{item.description}</h3>
            <p>
              <span>{item.sizeLabel}</span> 
              <span> ({item.sizeNum})</span>
            </p>
            <p>{item.price} руб.</p>
            <button
              onClick={() => {
                cart.remove(item.cartId);
              }}
            >
              Удалить товар из корзины
            </button>
          </li>
        ))}
      </ul>
      <p>Количество товаров в корзине {productsInCart.length} на сумму {TotalPrice} руб.</p>
    </div>) :
    (
      <p>Корзина пуста</p>
    )
  );
};
