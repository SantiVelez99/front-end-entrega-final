import HandleSubmit from '../../utilities/handleSubmit/HandleSubmit'
import './register.css'

export default function Register(){
    return(
        <main className="main-container">
        <form className="register-form" onSubmit={(e) => HandleSubmit(e)}>
            <h1 className="section-title">Registro de usuario</h1>
            <div className="inputs-container">
                <div className="input-group">
                    <label className="input-title" htmlFor="userName">Nombre:</label>
                    <input type="text" className="form-input" name="userName" id="userName" minLength="6" maxLength="30" autoFocus/>
                </div>
                <div className="input-group">
                    <label className="input-title" htmlFor="userSurname">Apellido:</label>
                    <input type="text" className="form-input" name="userSurname" id="userSurname" minLength="6" maxLength="30"/>
                </div>
                <div className="input-group">
                    <label className="input-title" htmlFor="email">Email:</label>
                    <input type="email" className="form-input" name="email" id="email" maxLength="60" placeholder="example@mail.com"
                        pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$" required/>
                </div>
                <div className="input-group">
                    <label className="input-title" htmlFor="userPassword">Contraseña:</label>
                    <input type="password" className="form-input" name="userPassword" id="userPassword" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$" required/>
                </div>
                <div className="input-group">
                    <label className="input-title" htmlFor="userPasswordConfirmation">Repetir Contraseña:</label>
                    <input type="password" className="form-input" name="userPasswordConfirmation" id="userPasswordConfirmation" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$" required/>
                </div>
                <div className="input-group">
                    <label className="input-title" htmlFor="bornDate">Fecha de nacimiento:</label>
                    <input type="date" className="form-input" name="bornDate" id="bornDate"/>
                </div>
                <div className="input-group">
                    <label className="input-title" htmlFor="country">Pais:</label>
                    <select name="country" id="country" className="form-input">
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
            </div>
        </form>
    </main>
    )
}