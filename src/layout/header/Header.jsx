import './header.css'
import { NavLink } from "react-router-dom"
export default function Header() {
    const isAdmin = true
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
        </header>
    )
}