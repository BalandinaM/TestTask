import { nanoid } from "nanoid";
import { createContext, useState } from "react";

const CartContext = createContext();

const CartContextProvider = (props) => {
  const [arrItems, setArrItems] = useState([]); // все товары, которые сейчас в корзине
  //const [swowItems, setShowItems] = useState(false)// содержимое корзины сейчас показывается?
  //const [showAlert, setShowAlert] = useState(null);// сообщение после добавления в корзину

  const append = (item) => {
    const newItem = {
      ...item,
      cartId: nanoid(3),
    };
    setArrItems([...arrItems, newItem]);
  };

  const remove = (id) => {
    const newCart = arrItems.filter((item) => item.id !== id);
    setArrItems(newCart);
  };

  // контекст, который будет доступен всем потомкам
  const value = {
    items: arrItems,
    append: append,
    remove: remove,
  };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
