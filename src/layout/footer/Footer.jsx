import { faDiceD20  } from '@fortawesome/free-solid-svg-icons'
import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareFacebook, faSquareInstagram, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons'
import { NavLink } from 'react-router-dom'


export default function Footer(){
    return(
        <footer className="main-footer">
        <div className="footer-container">
            <section className="social-media">
                <NavLink to="https://twitter.com" className="footer-link" target="_blank">
                <FontAwesomeIcon className="footer-sm-icon" icon={faSquareXTwitter} /> Twitter</NavLink>
                <NavLink to="https://www.instagram.com" className="footer-link" target="_blank">
                <FontAwesomeIcon className="footer-sm-icon" icon={faSquareInstagram} /> Instagram</NavLink>
                <NavLink to="https://www.facebook.com" className="footer-link" target="_blank">
                <FontAwesomeIcon className="footer-sm-icon" icon={faSquareFacebook} /> Facebook</NavLink>
            </section>
            <section className="brand-footer-section">
                <div className="brand-container">
                    <NavLink to="/" className="footer-link">
                    <FontAwesomeIcon className="footer-brand-icon" icon={faDiceD20} /></NavLink>
                    <NavLink to="/" className="footer-link footer-brand-name">G4G</NavLink>
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
                        <NavLink to="#" className="footer-link">Politica de Privacidad</NavLink>
                    </li>
                    <li className="footer-list-item">
                        <NavLink to="#" className="footer-link"> Informacion legal</NavLink>
                    </li>
                    <li className="footer-list-item">
                        <NavLink to="#" className="footer-link">Reembolsos</NavLink>
                    </li>
                    <li className="footer-list-item">
                        <NavLink to="#" className="footer-link">Cookies</NavLink>
                    </li>
                </ul>
            </section>
        </div>
    </footer>
    )
}