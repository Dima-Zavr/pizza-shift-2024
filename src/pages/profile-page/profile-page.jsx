import { useForm } from "react-hook-form"
import { useLoaderData } from "react-router-dom"

import { Button } from "../../components/Button/Button.jsx"
import { Input } from "../../components/Input/Input.jsx"
import { PATCH } from "../../rest-api/index.js"

export function ProfilePage() {
    const user = useLoaderData().user
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        const updateProfile = {
            profile: {
                firstname: data.firstname,
                middlename: data.middlename,
                lastname: data.lastname,
                email: data.email,
                city: data.city
            },
            phone: user.phone
        }
        PATCH("/users/profile", updateProfile, localStorage.getItem("token")).then(result => console.log(result))
    }

    return (
        <div className="page">
            <div className="container">
                <form className="form">
                    <h1>Профиль</h1>
                    <Input
                        text="Фамилия*"
                        type="text"
                        id="profile-lastname"
                        name="lastname"
                        placeholder="Фамилия"
                        defaultValue={user?.lastname}
                        register={register}
                        label="lastname"
                        required={{
                            required: true,
                            maxLength: 100
                        }}
                        error={errors?.firstname.message}
                    />
                    <Input
                        text="Имя*"
                        type="text"
                        id="profile-firstname"
                        name="firstname"
                        placeholder="Имя"
                        defaultValue={user?.firstname}
                        register={register}
                        label="firstname"
                        required={{
                            required: true,
                            maxLength: 100
                        }}
                        error={errors?.firstname.message}
                    />
                    <Input
                        text="Отчество*"
                        type="text"
                        id="profile-middlename"
                        name="middlename"
                        placeholder="Отчество"
                        defaultValue={user?.middlename}
                        register={register}
                        label="middlename"
                        required={{
                            required: true,
                            maxLength: 100
                        }}
                        error={errors?.middlename.message}
                    />
                    <Input
                        text="Телефон*"
                        type="text"
                        id="profile-phone"
                        name="phone"
                        placeholder="Телефон"
                        readOnly={true}
                        defaultValue={user?.phone}
                        register={register}
                        label="phone"
                        {...register("phone", {
                            required: "phone required",
                            pattern: {
                                value: /^(\+7|8)[- ]?(\d{3})[- ]?(\d{3})[- ]?(\d{2})[- ]?(\d{2})$/i,
                                message: "Неправильный номер телефона!"
                            }
                        })}
                        error={errors?.phone.message}
                    />
                    <Input
                        text="Email"
                        type="email"
                        id="profile-email"
                        name="email"
                        placeholder="Email"
                        defaultValue={user?.email}
                        register={register}
                        label="email"
                        required={{
                            required: true,
                            pattern: {
                                required: "email required",
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,64}$/i,
                                message: "Неправильный email!"
                            }
                        }}
                        error={errors?.email.message}
                    />
                    <Input
                        text="Город"
                        type="text"
                        id="profile-city"
                        name="city"
                        placeholder="Город"
                        defaultValue={user?.city}
                        register={register}
                        label="city"
                        required={{
                            required: true,
                            maxLength: 100
                        }}
                        error={errors?.city.message}
                    />
                    <Button type="primary" onClick={handleSubmit(onSubmit)}>
                        Обновить данные
                    </Button>
                </form>
            </div>
        </div>
    )
}
