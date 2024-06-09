import './cart.css'
import { useProduct } from '../../context/ProductContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faMinus, faPlus, faX } from '@fortawesome/free-solid-svg-icons'
export default function Cart() {
    const { cartOrder, isClosed, handleCartClose, handleChangeQuantity, removeListItem, cartCount, cartTotal } = useProduct()
    return (
        <>
            <div className={isClosed ? "cart-modal" : "display-off"} onClick={handleCartClose}>
                <div className="cart-container" onClick={(e) => e.stopPropagation()}>
                    <div className="cart-header">
                        <h1 className='title underline'>Orden Actual:</h1>
                        <button className='cart-close-btn' onClick={() => handleCartClose(isClosed)}><FontAwesomeIcon icon={faX} /></button>
                    </div>
                    <div className="cart-body">
                        <ul className="cart-list">
                            {
                                cartOrder.map(product => {
                                    return (
                                        <li className='cart-item' key={product.id}>
                                            <img src={product.productImage} className="product-image" alt={`${product.productName} imagen`} title={product.productName} />
                                            <h1 className="product-title" title={product.productName}>{product.productName}</h1>
                                            <div className="product-quantity">

                                                <button title='Agregar producto' onClick={(e) => {
                                                    handleChangeQuantity(product.id, e.target.parentElement.children[1].value, "+")
                                                }}><FontAwesomeIcon className='btn-icon' icon={faPlus} /></button>

                                                <input type="number" className='product-quantity-input' value={product.quantity} onChange={(evt) =>
                                                    handleChangeQuantity(product.id, evt.target.value)} min={0} title='Cantidad de unidades' />
                                                <button title='Quitar producto' onClick={(e) => handleChangeQuantity(product.id, e.target.parentElement.children[1].value, "-")}><FontAwesomeIcon className='btn-icon' icon={faMinus} /></button>


                                            </div>
                                            <div className="product-price">
                                                <div className='underline'>
                                                    Precio ${product.productPrice}
                                                </div>
                                                <div>Subtotal ${(product.productPrice * product.quantity).toFixed(2)}</div>
                                            </div>
                                            <div className="cart-actions"><FontAwesomeIcon icon={faTrashCan} onClick={() => removeListItem(product.id)} title="Eliminar Producto" />
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="cart-footer underline">
                        <span>Items: {cartCount}</span>
                        <span>Total: ${cartTotal.toFixed(2)}</span>
                    </div>
                    <button className='cart-checkout-btn'>COMPRAR</button>
                </div>
            </div>
        </>
    )
}