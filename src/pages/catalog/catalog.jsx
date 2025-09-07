import { NavLink, useLoaderData } from 'react-router-dom'

export const Catalog = () => {
  const products = useLoaderData();

  const productsForRender = products.map((item) => {
    const productForRender = item.colors.map((elem) => {
      return (
        <li key={`${item.id} + ${elem.id}`} className='products_item'>
          <NavLink to={`product/${item.id}/${elem.id}`}>
              <h3>
                {item.name} {elem.name}
              </h3>
              <img
                src={elem.images[0]}
                alt={`${item.name} ${elem.name}`}
                width={50}
                height={75}
              />
              <p>Цена: {elem.price}</p>
          </NavLink>
        </li>
      );
    });
    return productForRender;
  });

  return (
    <div>
      <h2>Каталог</h2>
      <ul className='products_list'>{productsForRender}</ul>
    </div>
  );
};
