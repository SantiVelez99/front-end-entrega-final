import { useForm } from 'react-hook-form';
import { useProduct } from '../../context/ProductContext'
import './register.css'
import { useEffect } from 'react';
import { formatTimeStampToInputDate } from '../../utilities/formatTStampToInput/formatTStampToInput';

export default function Register( { editObj, isOpen } ) {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    const { postUser, setEditObj } = useProduct();

    const onSubmit = data => {
        data.userBorndate = new Date(data.userBorndate).getTime()
        postUser(data)
    }
    useEffect(()=>{
        setFormValues(editObj)
    }, [editObj])
    useEffect(()=>{
        reset()
        setEditObj([])
    },[isOpen])
    function setFormValues(editObj) {
        if (editObj) {
            setValue("id", editObj.id)
            setValue("userName", editObj.userName)
            setValue("userSurname", editObj.userSurname)
            setValue("userEmail", editObj.userEmail)
            setValue("userBorndate", formatTimeStampToInputDate(editObj.userBorndate))
            setValue("userPassword", editObj.userPassword)
            setValue("userPasswordConfirm", editObj.userPasswordConfirm)
            setValue("userAvatar", editObj.userAvatar)
            setValue("userCountry", editObj.userCountry)
        }
    }
    return (
            <form className={editObj?.id? "register-form edit-background" : "register-form"} onSubmit={handleSubmit(onSubmit)}>
                <h1 className="section-title underline">{editObj?.id? "Editar Usuario" : "Registro de usuario"}</h1>
                <div className="inputs-container">
                    <div className="input-group">
                        <input type="text" className='display-off' {...register("id")}/>
                        <label className="input-title">Nombre: *</label>
                        <input type="text" className="form-input" autoFocus={true} {...register("userName", { required: true, minLength: 3, maxLength: 30 })} />
                        {errors.userName?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.userName?.type === "minLength" || errors.userName?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-group">
                        <label className="input-title" htmlFor="userSurname">Apellido:</label>
                        <input type="text" className="form-input" {...register("userSurname", { minLength: 3, maxLength: 30 })} />
                        {errors.userSurname?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.userSurname?.type === "minLength" || errors.userSurname?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-group">
                        <label className="input-title">Email: *</label>
                        <input type="email" className="form-input" placeholder="example@mail.com" {...register("userEmail", { required: true, maxLength: 60 })} />
                        {errors.userEmail?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {errors.userEmail?.type === "maxLength" && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-group">
                        <label className="input-title">Contraseña: *</label>
                        <input type="password" className="form-input" {...register("userPassword", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/i })} />
                        {errors.userPassword?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {errors.userPassword?.type === "pattern" && (<span className='input-error'>La contraseña debe tener entre 8 y 30 caracteres y al menos una mayuscula, una minuscula y un numero</span>)}
                        
                    </div>
                    <div className="input-group">
                        <label className="input-title">Repetir Contraseña: *</label>
                        <input type="password" className="form-input" {...register("userPasswordConfirm", { required: true, minLength: 8, maxLength: 30 })} />
                        {(errors.userPassword != errors.userPasswordConfirm) && (<span className='input-error'>Las contraseñas no coinciden</span>)}
                    </div>
                    <div className="input-group">
                        <label className="input-title">Fecha de nacimiento:</label>
                        <input type="date" className="form-input" {...register("userBorndate")} />
                    </div>
                    <div className="input-group">
                        <label className="input-title" htmlFor="userAvatar">Avatar: (URL)</label>
                        <input type="url" className="form-input"  {...register("userAvatar", { minLength: 3, maxLength: 200 })} />
                    </div>
                    <div className="input-group">
                        <label className="input-title">Pais:</label>
                        <select className="form-input" {...register("userCountry")}>
                            <option value="ARG">Argentina</option>
                            <option value="CHL">Chile</option>
                            <option value="URU">Uruguay</option>
                            <option value="BRS">Brasil</option>
                            <option value="PRG">Paraguay</option>
                            <option value="BOL">Bolivia</option>
                            <option value="PRU">Peru</option>
                        </select>
                    </div>
                    <button type="submit" className="form-button">{editObj?.id? "Editar" : "Registrarse"}</button>
                    <span id='mandatoryField'>* campo obligatorio</span>
                </div>
            </form>
    )
}