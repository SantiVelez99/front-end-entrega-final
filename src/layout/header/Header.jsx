import './header.css'
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceD20, faCartShopping } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    const isAdmin = false
    return (
        <header className="main-header">
            <div className="bg-menu-container">
            <input type="checkbox" className="check-menu" id="check-menu"/>
            <label htmlFor="check-menu" className="burguer-menu">
                <div className="burguer-line"></div>
            </label>
            <nav className='nav-menu'>
                <ul className='nav-list'>
                    <li className='nav-item'><NavLink to="/">Principal</NavLink></li>
                    <li className='nav-item'><NavLink to="/register">Registrarse</NavLink></li>
                    <li className='nav-item'><NavLink to="/login">LogIn</NavLink></li>
                    <li className='nav-item'><NavLink to="/contact">Contacto</NavLink></li>
                    <li className='nav-item'><NavLink to="/about-us">Acerca de</NavLink></li>
                    {isAdmin && (
                        <>
                            <li className='nav-item'><NavLink to="/admin-product">Admin Product</NavLink></li>
                            <li className='nav-item'><NavLink to="/admin-users">Admin Users</NavLink></li>
                        </>
                    )}
                </ul>
            </nav>
            </div>
            <div className="header-container">
            <a href="/" className="title-link"><FontAwesomeIcon className="header-icon" icon={faDiceD20} /></a>
            <a href="/" className="title-link">
                <h1 className="header-title">G4G</h1>
            </a>
        </div>
        <div className="user-info-container">
            <div className="user-cart">
                <a href="#" className="title-link"><FontAwesomeIcon className="user-cart-icon" icon={faCartShopping} /></a>
            </div>
            <div className="user-info">
                <img className="user-icon" src="src/assets/user/user-profile-default.png" alt="user profile default"/>
                <div className="user-name-container">
                    <span className="user-name">User</span>
                    <span className="user-surname">Name</span>
                </div>
            </div>
        </div>
        </header>
    )
}
