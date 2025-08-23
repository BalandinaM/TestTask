import {
  NavLink,
  useLoaderData,
  useParams,
} from "react-router-dom";
import { useState } from "react";

export const ProductPage = () => {
  const { productColor, allSizes, product } = useLoaderData();
  const { productId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === productColor.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? productColor.images.length - 1 : prev -1
    );
  };

  console.log(productColor);
  console.log(allSizes);
  console.log(product);

  return (
    <div>
      <div className="wrap_image">
        {productColor.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className=""
              aria-label="Предыдущее изображение"
            >
              Назад
            </button>
            <img
              src={productColor.images[currentImageIndex]}
              alt={productColor.name}
              width={50}
              height={75}
            />

            <button
              onClick={nextImage}
              className=""
              aria-label="Следующее изображение"
            >
              Вперед
            </button>
          </>
        )}
      </div>
      <p>Цена: {productColor.price}</p>
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
              />
              {size.label} ({size.number})
            </label>
          ))}
        </div>
      </div>
      <h3>{productColor.description}</h3>
      <ul>
        Доступные цвета
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
      <button>Добавить в корзину</button>
    </div>
  );
};
