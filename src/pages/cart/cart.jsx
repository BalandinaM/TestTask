import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../CartContext"

export const Cart = () => {
  const cart = useContext(CartContext);
  const [productsInCart, setProductsCart] = useState([]);

  useEffect(() => {
    const loadProducts = async() => {
      if (cart.items.length > 0) {
        const result = await cart.getProductsForCart(cart.items);
        setProductsCart(result);
    }
  };
  loadProducts();
 }, [cart]);

 console.log(cart.items)
 console.log(productsInCart);

  return (
    <div>
      <ul>
        {productsInCart.map((item) => (
          <li key={item.id}>
            Товар {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};