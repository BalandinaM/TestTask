import {
  NavLink,
  useLoaderData,
  useParams,
} from "react-router-dom";

export const ProductPage = () => {
  const { productColor, allSizes, product } = useLoaderData();
  const { productId } = useParams();

  console.log(productColor);
  console.log(allSizes);
  console.log(product);

  return (
    <div>
      <img
        src={productColor.images[0]}
        alt={productColor.name}
        width={50}
        height={75}
      />
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
