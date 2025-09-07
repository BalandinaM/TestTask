import { NavLink, useLoaderData, useParams } from "react-router-dom";
import { ProductImages } from "../../components/productImages/productImages";
import { useContext, useState } from "react";
import { CartContext } from "../../CartContext";

export const ProductPage = () => {
  const { productColor, allSizes, product } = useLoaderData();
  const { productId, colorId } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const cart = useContext(CartContext);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    
    const itemToAdd = {
      productId: productId,
      colorId: colorId,
      sizeId: selectedSize,
    };
    
    cart.append(itemToAdd);
    setSelectedSize(null)
  };

  const handleSizeSelect = (sizeId) => {
    setSelectedSize(sizeId);
  };

  return (
    <div>
      <ProductImages images={productColor.images} nameAlt={productColor.name} />
      <p>Цена: {productColor.price}</p>
      <div className="wrap_selectColor">
        <p>Доступные цвета:</p>
        <ul className="colorsList">
          {product.colors.map((color) => {
            return (
              <li key={color.id}>
                <NavLink
                  to={`/catalog/product/${productId}/${color.id}`}
                  className={({ isActive }) => (isActive ? "active-color" : "")}
                >
                  {color.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="wrap_sizes">
        <p>Доступные размеры: </p>
        <div>
          {allSizes.map((size) => (
            <label
              key={size.id}
              className={
                !productColor.sizes.includes(size.id) ? "disabled" : ""
              }
            >
              <input
                type="radio"
                value={size.id}
                name="size_radio_button"
                disabled={!productColor.sizes.includes(size.id)}
                onChange={() => handleSizeSelect(size.id)} 
                checked={selectedSize === size.id}
              />
              {size.label} ({size.number})
            </label>
          ))}
        </div>
      </div>
      <button onClick={handleAddToCart}
        disabled={!selectedSize}>Добавить в корзину</button>
      <h3>{productColor.description}</h3>   
    </div>
  );
};
