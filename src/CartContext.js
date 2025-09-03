import { nanoid } from "nanoid";
import { createContext, useState } from "react";
import { getProductColor } from "./services/api";

const CartContext = createContext();

const CartContextProvider = (props) => {
  const [arrItems, setArrItems] = useState([]); // все товары, которые сейчас в корзине

  const append = (item) => {
    const newItem = {
      ...item,
      cartId: nanoid(3),
    };
    setArrItems([...arrItems, newItem]);
  };

  const getProductsForCart = async (arrItems) => {
    try {
      const productPromises = arrItems.map((item) =>
        getProductColor(item.productId, item.colorId)
      );

      const productsForCart = await Promise.all(productPromises);
      return productsForCart;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const remove = (id) => {
    const newCart = arrItems.filter((item) => item.id !== id);
    setArrItems(newCart);
  };

  const value = {
    items: arrItems,
    getProductsForCart: getProductsForCart,
    append: append,
    remove: remove,
  };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
