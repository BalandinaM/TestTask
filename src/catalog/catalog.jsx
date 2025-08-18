import { useLoaderData } from 'react-router-dom'

export const Catalog = () => {
  const productsArray = useLoaderData();
  console.log(productsArray);

  return <div>Каталог</div>;
};
