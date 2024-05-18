import './contact.css'

export default function Contact() {
    return (
        <main className="main-container" id='contactContainer'>
            <div className="contact-form-title">
                <h1>Envianos tu consulta</h1>
            </div>
            <div className="contact-container">
                <form className="contact-form">
                    <div className="contact-form-container">
                        <label className="contact-form-label" htmlFor="fullName">Nombre Completo:</label>
                        <input className="contact-form-input" type="text" name="fullName" id="fullName" minLength="10" maxLength="60" autoFocus required/>
                    </div>
                    <div className="contact-form-container">
                        <label className="contact-form-label" htmlFor="email">Email:</label>
                        <input className="contact-form-input" type="email" name="email" id="email" maxLength="60" placeholder="example@mail.com"
                            pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$" required/>
                    </div>
                    <div className="contact-form-container">
                        <label className="contact-form-label" htmlFor="message">Su Mensaje:</label>
                        <textarea className="contact-form-textarea" name="message" id="message" cols="30" rows="10" maxLength="500" required></textarea>
                    </div>
                    <div className="contact-form-container">
                        <label className="contact-form-label" htmlFor="picture">Adjutar imagen(opcional)</label>
                        <input className="contact-form-input" type="file" accept="image/*" name="picture" id="picture"/>
                    </div>
                    <div className="contact-form-container"><button className="contact-form-button" type="submit">Enviar</button></div>
                </form>
                <div className="contact-map-container">
                    <div className="contact-map-title">
                        <h4>Donde encontrarnos:</h4>
                    </div>
                    <iframe className="contact-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d418.6638867202922!2d-60.73223329452155!3d-32.91637805762605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b652e544921673%3A0xb554ef74cdbf7583!2sAv.%20G%C3%A9nova%207872%2C%20S2006%20Rosario%2C%20Santa%20Fe!5e0!3m2!1ses-419!2sar!4v1709139596891!5m2!1ses-419!2sar" style={{border: 0}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </main>
    )
}