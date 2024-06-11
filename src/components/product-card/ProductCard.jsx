import './product-card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  {faStar as faStarEmpty} from '@fortawesome/free-regular-svg-icons'
import { faCartShopping, faStar } from '@fortawesome/free-solid-svg-icons'
import DateFormat from '../../utilities/dateFormat/DateFormat'
import { useProduct } from '../../context/ProductContext'
import { NavLink } from 'react-router-dom'


export default function ProductCard({ producto }) {
    const { favList, addToCart, addToFavList } = useProduct()
    
    return (
        <>
            <article className="card-container">
                <div className="card-img-container">
                    <FontAwesomeIcon className='fav-icon' icon={favList.includes(producto)? faStar : faStarEmpty} title='Agregar a favoritos' onClick={() => addToFavList(producto)} />
                    <NavLink to={`/product-detail/${producto.id}`} className="game-link">
                        <img className="game-img" src={producto.productImage} alt={producto.productName} />
                        <p className="description">{producto.productDesc}</p>
                    </NavLink>
                </div>
                <div className="game-info">
                    <div className="info-container">
                        <NavLink className="game-link" to={`/product-detail/${producto.id}`}>
                            <h1 className="game-title" title={producto.productName}>{producto.productName}</h1>
                        </NavLink>
                        <div className="release-date">{DateFormat(producto.productDate)}</div>
                    </div>
                    <div className="buy-container">
                        <div className="price">${producto.productPrice}</div>
                        <button type="submit" className="buy-button" onClick={() => addToCart(producto)}><FontAwesomeIcon className='buy-icon' icon={faCartShopping} />
                            <span>AGREGAR</span>
                        </button>
                    </div>
                </div>
            </article>
        </>
    )
}