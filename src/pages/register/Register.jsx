import { useForm } from 'react-hook-form';
import { useProduct } from '../../context/ProductContext'
import './register.css'

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { addUser } = useProduct();

    const onSubmit = data => {
        data.id = crypto.randomUUID()
        data.userBorndate = new Date(data.userBorndate).getTime()
        addUser(data)
        console.log(data)
    }
    return (
        <main className="main-container">
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="section-title">Registro de usuario</h1>
                <div className="inputs-container">
                    <div className="input-group">
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
                    <button type="submit" className="form-button">Registrarse</button>
                    <span id='mandatoryField'>* campo obligatorio</span>
                </div>
            </form>
        </main>
    )
}