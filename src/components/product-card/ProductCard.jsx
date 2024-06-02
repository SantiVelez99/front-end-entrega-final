import { faStar } from '@fortawesome/free-regular-svg-icons'
import './product-card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'


export default function ProductCard( {producto} ){

    return(
            <article className="card-container">
                <div className="card-img-container">
                    <FontAwesomeIcon className='fav-icon' icon={faStar}/>
                    <a href="/" className="game-link">
                        <img className="game-img" src={producto.productImage} alt={producto.productName}/>
                        <p className="description">{producto.productDesc}</p>
                    </a>
                </div>
                <div className="game-info">
                    <div className="info-container">
                        <a className="game-link" href="/">
                            <h1 className="game-title">{producto.productName}</h1>
                        </a>
                        <div className="release-date">{producto.productDate}</div>
                    </div>
                    <div className="buy-container">
                        <div className="price">${producto.productPrice}</div>
                        <a href="/" className="game-link">
                            <button type="submit" className="buy-button"><FontAwesomeIcon className='buy-icon' icon={faCartShopping}/>
                                <span>AGREGAR</span>
                            </button>
                        </a>
                    </div>
                </div>
            </article>
    )
}