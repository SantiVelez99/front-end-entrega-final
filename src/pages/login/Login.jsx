import HandleSubmit from '../../utilities/handleSubmit/HandleSubmit'
import './login.css'

export default function Login() {
    return (
        <main className='main-container' id='loginForm'>
            <div className="login-form">
                <form onSubmit={(e) => HandleSubmit(e)}>
                    <div className="input-container">
                        <label htmlFor="emailLogin" className='input-title'>Email:</label>
                        <input type="email" className='form-input' name="emailLogin" id="emailLogin" pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$" required />
                    </div>
                    <div className="input-container">
                        <label htmlFor="userPassword" className='input-title'>Contraseña:</label>
                        <input type="password" className='form-input' name="userPassword" id="userPasswordLogin" required />
                    </div>
                    <button className='form-btn' type='submit'>Ingresar</button>
                </form>
            </div>
        </main>
    )
}