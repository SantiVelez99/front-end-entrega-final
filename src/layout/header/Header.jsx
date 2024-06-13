import './header.css'
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceD20, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Modal from '../modal/Modal'
import Register from '../../pages/register/Register'
import { useState } from 'react'
import Cart from '../cart/Cart'
import { useProduct } from '../../context/ProductContext'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import FavouriteModal from '../../components/favouriteModal/FavouriteModal'

export default function Header() {

    const isAdmin = true
    const { isClosed, handleCartClose, cartCount } = useProduct()
    const [isOpenR, setIsOpenR] = useState(false)
    const [isOpenFav, setIsOpenFav] = useState(false)
    function handleModalOpen(modal) {
        if (modal === "R") setIsOpenR(true)
        if (modal === "Fav") setIsOpenFav(true)
    }
    function handleModalClose() {
        setIsOpenR(false)
        setIsOpenFav(false)
    }
    function burguerMenu() {
        const bgMenu = document.getElementById("check-menu")
        console.dir(bgMenu.checked)
        bgMenu.checked(false)
    }
    return (
        <>

            <header className="main-header">
                <div className="bg-menu-container">
                    <input type="checkbox" className="check-menu" id="check-menu" />
                    <label htmlFor="check-menu" className="burguer-menu">
                        <div className="burguer-line"></div>
                    </label>
                    <nav className='nav-menu'>
                        <ul className='nav-list'>
                            <li className='nav-item'><NavLink to="/" onClick={() => burguerMenu()}>Principal</NavLink></li>
                            <li className='nav-item'>
                                <NavLink onClick={() => handleModalOpen("R")}>
                                    Registrarse
                                </NavLink>
                            </li>
                            <li className='nav-item'><NavLink to="/login" onClick={() => burguerMenu()}>LogIn</NavLink></li>
                            <li className='nav-item'><NavLink to="/contact" onClick={() => burguerMenu()}>Contacto</NavLink></li>
                            <li className='nav-item'><NavLink to="/about-us" onClick={() => burguerMenu()}>Acerca de</NavLink></li>
                            {isAdmin && (
                                <>
                                    <li className='nav-item'><NavLink to="/admin-product" onClick={() => burguerMenu()}>Admin Product</NavLink></li>
                                    <li className='nav-item'><NavLink to="/admin-users" onClick={() => burguerMenu()}>Admin Users</NavLink></li>
                                </>
                            )}
                            <li className='nav-item'><NavLink onClick={() => handleModalOpen("Fav")}><FontAwesomeIcon icon={faStar} /></NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div className="header-container">
                    <NavLink to={"/"} className="title-link"><FontAwesomeIcon className="header-icon" icon={faDiceD20} /></NavLink>
                    <NavLink to={"/"} className="title-link">
                        <h1 className="header-title">G4G</h1>
                    </NavLink>
                </div>
                <div className="user-info-container">
                    <div className={`user-cart ${cartCount >= 1 ? 'show-circle' : ''}`} data-count={cartCount}>
                        <FontAwesomeIcon className="user-cart-icon" icon={faCartShopping} onClick={() => handleCartClose(isClosed)} />
                    </div>
                    <div className="user-info">
                        <img className="user-icon" srcSet="src/assets/user/user-profile-default.png" alt="user profile default" />
                        <div className="user-name-container">
                            <span className="user-name">User</span>
                        </div>
                    </div>
                </div>
            </header>

            <Modal isOpen={isOpenR} handleModalClose={handleModalClose}>
                <Register />
            </Modal>
            <Modal isOpen={isOpenFav} handleModalClose={handleModalClose}>
                <FavouriteModal />
            </Modal>
            <Cart />
        </>
    )
}
