import styles from "./styles.module.css"
import { Button } from "../button/index.jsx"

//Компонент вывода пицц лежащих в корзине в корзине
export const Purchases = ({onClick}) => {

    return(
        <>
            <h1>Корзина</h1>
            <div className={styles.block}></div>

            <Button
                onClick={() => onClick("dataEntry")}
            >
                Оформить заказ
            </Button>
        </>
    )
}