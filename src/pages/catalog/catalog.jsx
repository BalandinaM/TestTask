import { NavLink, useLoaderData } from 'react-router-dom'

export const Catalog = () => {
  const products = useLoaderData();

  //вынести карточку в отдельный компонент
  //подумать над неймингом, ерунду какая-то
  //заменить map на flatmap
  const productsForRender = products.map((item) => {
    const productForRender = item.colors.map((elem) => {
      //console.log(elem);
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
              {/* <p>{elem.description}</p> */}
              <p>Цена: {elem.price}</p>
          </NavLink>
        </li>
      );
    });
    //console.log(productForRender);
    return productForRender;
  });

  return (
    <div>
      <h2>Каталог</h2>
      <ul className='products_list'>{productsForRender}</ul>
    </div>
  );
};
