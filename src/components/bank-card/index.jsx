import styles from "./styles.module.css"
import { BtnPrimary } from "../buttons/btn-primary.jsx"
import { useState } from "react"
import { Modal } from "../modal/index.jsx"
import  success from "../../assets/success.svg"
import { Link } from "react-router-dom"
import { Input } from "../input/index.jsx"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { addDebitCard, selectCart } from "../../store/pizzaSlice.js"
import { POST } from "../../rest-api/index.js"

export const BankCard = () => {
    const[isModal, setIsModal] = useState(false)
    const dispatch = useDispatch()
    const pizza = useSelector(selectCart)
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        setIsModal(true)
        dispatch(addDebitCard(data))
        console.log(pizza)
        POST("/pizza/payment", pizza).then(result => console.log(result))
    }

    return(
        <>
            <form className="form">
                <h1>Введите данные карты для оплаты</h1>
                <div className={styles.block}>
                    <Input
                        text="Номер*"
                        type="text"
                        id="number"
                        name="number"
                        placeholder="0000 0000"
                        register={register}
                        label="pan"
                        required={{
                            required: "number required",
                            pattern: {
                                value: /^\d{4} \d{4}$/,
                                message: "Неправильный номер банковской карты!"
                            }
                        }}
                        error-msg={errors?.number.message}
                    />
                    <div className={styles.lower}>
                        <Input
                            text="Срок*"
                            type="text"
                            id="term"
                            name="term"
                            placeholder="00/00"
                            register={register}
                            label="expireDate"
                            required={{
                                required: "term required",
                                pattern: {
                                    value: /^(([0][0-9])|([1][0-2]))[\/][0-9]{2}$/,
                                    message: "Неправильная дата!"
                                }
                            }}
                            error-msg={errors?.term.message}
                        />
                        <Input
                            text="CVV*"
                            type="text"
                            id="cvv"
                            name="cvv"
                            placeholder="0000"
                            register={register}
                            label="cvv"
                            required={{
                                required: "cvv required",
                                pattern: {
                                    value: /^[0-9]{4}$/,
                                    message: "Неправильный CVV код!"
                                }
                            }}
                            error-msg={errors?.cvv.message}
                        />
                    </div>
                </div>
                <BtnPrimary onClick={handleSubmit(onSubmit)}>
                    Оплатить
                </BtnPrimary>
            </form>
            {isModal &&
                <Modal
                    onClose={() => {
                        setIsModal(false)
                        document.body.style.overflow = "unset"
                    }}
                >
                    <div className={styles.modal}>
                        <img
                            src={success}
                            alt="success"
                        />
                        <h2>Оплата прошла успешно!</h2>
                        <p>
                            <span>Заказ</span><br/>
                            <p></p>
                            <span>Адрес доставки</span><br/>
                            <p></p>
                            <span>Сумма заказа</span>
                            <p></p>
                            <span>Вся информация была продублирована в SMS</span>
                        </p>
                        <Link to="/catalog">
                            Перейти в главное меню
                        </Link>
                    </div>
                </Modal>
            }

        </>
    )
}