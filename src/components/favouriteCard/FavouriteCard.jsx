import { NavLink } from 'react-router-dom'
import { useProduct } from '../../context/ProductContext'
import './favourite-card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Modal from '../../layout/modal/Modal'
import TagsModal from '../tagsModal/TagsModal'
import { useState } from 'react'

export default function FavouriteCard({ producto }) {
    const { addToFavList, addToCart } = useProduct()
    const [ isOpen, setIsOpen ] = useState(false)
    const [tag, setTag] = useState()
    function handleModalOpen(){
        if(!isOpen) {
            setIsOpen(true)
        }
        if(isOpen) setIsOpen(false)
    }
    function getTag(prod){
        setTag(prod)
        handleModalOpen()
    }
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
                                    <NavLink className="fav-card-link" key={crypto.randomUUID()} onClick={() => getTag(prod)} >
                                        <li className='fav-card-item' >{prod}</li>
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
            <Modal handleModalClose={handleModalOpen} isOpen={isOpen}>
                <TagsModal tag={tag} producto={producto}/>
            </Modal>
        </>
    )
}