import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useProduct } from "../../context/ProductContext"
import './tags-card.css'

export default function TagsCard({producto}){
    const{ addToCart } = useProduct()
    return(
            <div className="tag-card-container">
                <div className="tag-card-image">
                    <img src={producto.productImage} alt={`${producto.productName} imagen`} />
                </div>
                <div className="tag-card-info">
                    <h3 className="tag-card-title">{producto.productName}</h3>
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