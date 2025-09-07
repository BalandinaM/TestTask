import { nanoid } from "nanoid";
import { createContext, useState } from "react";
import { getProductColor, getSize } from "./services/api";

const CartContext = createContext();

const CartContextProvider = (props) => {
  const [arrItems, setArrItems] = useState([]);

  const append = (item) => {
    const newItem = {
      ...item,
      cartId: nanoid(3),
    };
    setArrItems([...arrItems, newItem]);
  };

  const getProductsForCart = async (arrItems) => {
    try {
      const productPromises = arrItems.map(async (item) => {
        try {
          const [productData, sizeData] = await Promise.all([
            getProductColor(item.productId, item.colorId),
            getSize(item.sizeId)
          ]);
          return {
            description: productData.description,
            price: productData.price,
            image: productData.images[0],
            sizeLabel: sizeData.label,
            sizeNum: sizeData.number,
            cartId: item.cartId
          }
        } catch (error) {
        console.error(`Error loading product ${item.productId}:`, error);
        throw error;
    }});

      const productsForCart = await Promise.all(productPromises);
      return productsForCart;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const remove = (cartId) => {
    const newCart = arrItems.filter((item) => item.cartId !== cartId);
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
