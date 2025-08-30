import { useContext } from "react"
import { CartContext } from "../../CartContext"

export const Cart = () => {
    const cart = useContext(CartContext);
    console.log(cart.items.length)

    return (
        <div>
            Корзина
        </div>
    )
}