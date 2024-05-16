import './header.css'
import { NavLink } from "react-router-dom"
export default function Header() {
    const isAdmin = true
    return (
        <header className="header-container">
            <nav className='nav-menu'>
                <ul className='nav-list'>
                    <li><NavLink to="/">Principal</NavLink></li>
                    <li><NavLink to="/register">Registrarse</NavLink></li>
                    <li><NavLink to="/login">LogIn</NavLink></li>
                    <li><NavLink to="/contact">Contacto</NavLink></li>
                    <li><NavLink to="/about-us">Acerca de</NavLink></li>
                    {isAdmin && (
                        <>
                            <li><NavLink to="/admin-product">Admin Product</NavLink></li>
                            <li><NavLink to="/admin-users">Admin Users</NavLink></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}