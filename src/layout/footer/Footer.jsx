import { faDiceD20  } from '@fortawesome/free-solid-svg-icons'
import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareFacebook, faSquareInstagram, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons'


export default function Footer(){
    return(
        <footer className="main-footer">
        <div className="footer-container">
            <section className="social-media">
                <a href="https://twitter.com" className="footer-link" target="_blank">
                <FontAwesomeIcon className="footer-sm-icon" icon={faSquareXTwitter} /> Twitter</a>
                <a href="https://www.instagram.com" className="footer-link" target="_blank">
                <FontAwesomeIcon className="footer-sm-icon" icon={faSquareInstagram} /> Instagram</a>
                <a href="https://www.facebook.com" className="footer-link" target="_blank">
                <FontAwesomeIcon className="footer-sm-icon" icon={faSquareFacebook} /> Facebook</a>
            </section>
            <section className="brand-footer-section">
                <div className="brand-container">
                    <a href="/" className="footer-link">
                    <FontAwesomeIcon className="footer-brand-icon" icon={faDiceD20} /></a>
                    <a href="/" className="footer-link footer-brand-name">G4G</a>
                </div>
            </section>
            <section className="copyright">
                <p className="copyright-text">
                    © 2024 G4G Corporation. Todos los derechos reservados. Todas las marcas registradas pertenecen a sus
                    respectivos dueños.
                    Todos los precios incluyen IVA (donde sea aplicable).
                </p>
                <ul className="footer-list">
                    <li className="footer-list-item">
                        <a href="#" className="footer-link">Politica de Privacidad</a>
                    </li>
                    <li className="footer-list-item">
                        <a href="#" className="footer-link"> Informacion legal</a>
                    </li>
                    <li className="footer-list-item">
                        <a href="#" className="footer-link">Reembolsos</a>
                    </li>
                    <li className="footer-list-item">
                        <a href="#" className="footer-link">Cookies</a>
                    </li>
                </ul>
            </section>
        </div>
    </footer>
    )
}