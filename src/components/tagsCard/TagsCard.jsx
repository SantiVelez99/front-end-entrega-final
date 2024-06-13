import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useProduct } from "../../context/ProductContext"
import './tags-card.css'
import { NavLink } from "react-router-dom"

export default function TagsCard({ producto }) {
    const { addToCart, handleReload } = useProduct()
    return (
        <div className="tag-card-container">
            <div className="tag-card-image">
                <img src={producto.productImage} alt={`${producto.productName} imagen`} />
            </div>
            <div className="tag-card-info">
                <h3 className="tag-card-title"><NavLink className="tag-card-link" to={`/product-detail/${producto.id}`} onClick={(e) => handleReload(e)}>
                {producto.productName}</NavLink></h3>
                <p className="tag-card-description">
                    {producto.productDesc}
                </p>
            </div>
            <div className="tag-card-buy-section">
                <div className="tag-card-price">${producto.productPrice}</div>
                <button className="tag-card-addToCart" onClick={() => addToCart(producto)}><FontAwesomeIcon className='fav-cart-icon' icon={faCartShopping} /></button>
            </div>
        </div>
    )
}