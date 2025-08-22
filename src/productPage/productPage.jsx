import { useLoaderData } from "react-router-dom"

export const ProductPage = () => {
    const Product = useLoaderData();
    console.log(Product);

    return (
        <div>
            <img
                src={Product.images[0]}
                alt={Product.name}
                width={50}
                height={75}
              />
            <p>Цена: {Product.price}</p>
            <p>Доступные размеры: </p>
            <h3>{Product.description}</h3>
            <div>тут карточки в других цветах. Активную выделить цветом</div>
            <button>Добавить в корзину</button>
        </div>
    )
}