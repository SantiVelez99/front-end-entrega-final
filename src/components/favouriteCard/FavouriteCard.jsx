import { NavLink } from 'react-router-dom'
import { useProduct } from '../../context/ProductContext'
import './favourite-card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

export default function FavouriteCard({ producto }) {
    const { addToFavList, addToCart } = useProduct()
    return (
        <>
            <div className="favcard-container">
                <div className="image">
                    <img src={producto.productImage} alt="" />
                </div>
                <div className='info'>
                    <h1 className='fav-card-title'><NavLink to={`/product-detail/${producto.id}`} className="fav-card-link">{producto.productName}</NavLink></h1>
                    <ul className='fav-card-list'>
                        {
                            producto.productTags.map((prod) => {
                                return (
                                    <NavLink className="fav-card-link" key={crypto.randomUUID()}>
                                        <li className='fav-card-item'>{prod}</li>
                                    </NavLink>
                                )
                            })
                        }
                    </ul>
                    <NavLink className="remove-link" onClick={() => addToFavList(producto)}>Eliminar de la lista</NavLink>
                </div>
                <div className="fav-buy-section">
                        <div className="fav-price">${producto.productPrice}</div>
                        <button className="fav-add-to-cart" onClick={() => addToCart(producto)}><FontAwesomeIcon className='fav-cart-icon' icon={faCartShopping} /></button>
                </div>
            </div>
        </>
    )
}