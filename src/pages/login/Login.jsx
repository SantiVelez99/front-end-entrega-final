import { useForm } from 'react-hook-form';
import './login.css'

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data)
    }

    return (
        <main className='main-container' id='loginForm'>
            <div className="login-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-container">
                        <label className='input-title'>Email:</label>
                        <input type="email" className='form-input' autoFocus={true} {...register("loginEmail", {required:true, maxLength:60})} />
                        {errors.loginEmail?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {errors.loginEmail?.type === "maxLength" && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className='input-title'>Contraseña:</label>
                        <input type="password" className='form-input' {...register("loginPassword", {required:true, maxLength:60})} />
                        {errors.loginPassword?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {errors.loginPassword?.type === "maxLength" && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <button className='form-btn' type='submit'>Ingresar</button>
                </form>
            </div>
        </main>
    )
}