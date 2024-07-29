import './header.css'
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceD20, faCartShopping, faSortDown } from '@fortawesome/free-solid-svg-icons'
import Modal from '../modal/Modal'
import Register from '../../pages/register/Register'
import { useState } from 'react'
import Cart from '../cart/Cart'
import { useProduct } from '../../context/ProductContext'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import FavouriteModal from '../../components/favouriteModal/FavouriteModal'
import { useUser } from '../../context/UserContext'

export default function Header() {

    const { isClosed, handleCartClose, cartCount, baseURL } = useProduct()
    const { user, logOut } = useUser()
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
        bgMenu.checked(false)
    }
    function showList() {
        const list = document.getElementById("user-menu")
        list.className === "display-off" ? list.className = "" : list.className = "display-off"
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
                            {
                                user?._id ? null :
                                    <>
                                        <li className='nav-item'><NavLink onClick={() => handleModalOpen("R")}>Registrarse</NavLink></li>
                                        <li className='nav-item'><NavLink to="/login" onClick={() => burguerMenu()}>Ingresar</NavLink></li>
                                    </>
                            }
                            <li className='nav-item'><NavLink to="/contact" onClick={() => burguerMenu()}>Contacto</NavLink></li>
                            <li className='nav-item'><NavLink to="/about-us" onClick={() => burguerMenu()}>Acerca de</NavLink></li>
                            {user?.userRole === "ADMIN_ROLE" && (
                                <>
                                    <li className='nav-item'><NavLink to="/admin-product" onClick={() => burguerMenu()}>Admin Product</NavLink></li>
                                    <li className='nav-item'><NavLink to="/admin-users" onClick={() => burguerMenu()}>Admin Users</NavLink></li>
                                    <li className='nav-item'><NavLink to="/admin-orders" onClick={() => burguerMenu()}>Admin Orders</NavLink></li>
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
                        <img className="user-icon" srcSet={user?.userAvatar?.id ? `${baseURL}/images/users/user-avatar/${user.userAvatar.id}` : `${baseURL}/images/users/user-avatar/user-profile-default.png`} alt="user profile default" />
                            <div className="user-name" onClick={user?._id ? () => showList() : null}>
                                {user?.userName ? user.userName : "Usuario"}
                                <FontAwesomeIcon icon={faSortDown} />
                                <ul id='user-menu' className='display-off'>
                                    <li>Mis Compras</li>
                                    <li onClick={() => logOut()}>Cerrar sesión</li>
                                </ul>
                        </div>
                    </div>
                </div>
            </header>

            <Modal isOpen={isOpenR} handleModalClose={handleModalClose}>
                <Register handleModalClose={handleModalClose} />
            </Modal>
            <Modal isOpen={isOpenFav} handleModalClose={handleModalClose}>
                <FavouriteModal />
            </Modal>
            <Cart />
        </>
    )
}
