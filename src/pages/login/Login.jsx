import { useForm } from 'react-hook-form';
import './login.css'
import { useUser } from '../../context/UserContext';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { logIn } = useUser()
    const onSubmit = data => {
        console.log(data)
        logIn(data)
    }

    return (
        <main className='main-container' id='loginForm'>
            <div className="underline">
                <h1 className='section-title'>Ingresa con tu cuenta</h1>
            </div>
            <div className="login-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-container">
                        <label className='input-title'>Email:</label>
                        <input type="email" className='form-input' autoFocus={true} {...register("userEmail", {required:true, maxLength:60})} />
                        {errors.userEmail?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {errors.userEmail?.type === "maxLength" && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className='input-title'>Contraseña:</label>
                        <input type="password" className='form-input' {...register("userPassword", {required:true, maxLength:60})} />
                        {errors.userPassword?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {errors.userPassword?.type === "maxLength" && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                    <button type='submit'>Ingresar</button>
                    </div>
                </form>
            </div>
        </main>
    )
}