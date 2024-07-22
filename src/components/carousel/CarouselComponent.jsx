import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './carousel.css'
import { faAngleLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { useProduct } from '../../context/ProductContext'
import { useState } from 'react'

export default function CarouselComponent() {
    const { product } = useProduct()
    const [id, setID] = useState()
    function btnCarousel(e, id) {
        const items = Array.from(e.target.parentElement.parentElement.children)
        items.forEach((item) => {
            if (item.id == id) {
                item.className = "carousel-item active"
            } else {
                item.className = "carousel-item unactive"
            }
        })
    }
    function toProdDetails(e) {
        const name = e.target.alt
        const prod = product.find(prod => prod.productName === name)
        // setID(prod._id)
    }
    return (
        <div className="carousel-container">
            <div className="carousel-item active" id="1">
                <button className="carousel-btn left" onClick={(e) => btnCarousel(e, 4)}><FontAwesomeIcon className="btn-icon" icon={faAngleLeft} /></button>
                <div className="item-image">
                    <NavLink onMouseOver={(e) => toProdDetails(e)} onTouchStart={(e) => toProdDetails(e)} to={`/product-detail/${id}`}>
                        <picture>
                            <source srcSet='https://i.ibb.co/6DzfzYW/elden-ring-carousel-sm.jpg' media='(width <= 500px)' />
                            <img src="https://i.ibb.co/86R0gHh/elden-ring-carousel.jpg" alt="ELDEN RING" />
                        </picture>
                    </NavLink>
                </div>
                <div className="item-text">
                    <h1 className="item-title">ELDEN RING</h1>
                    <p className="item-desc">Un mundo inmenso te esta esperando! Adentrate en las tierras intermedias y descubre todos
                        sus secretos.</p>
                </div>
                <button className="carousel-btn right" onClick={(e) => btnCarousel(e, 2)}><FontAwesomeIcon className="btn-icon" icon={faChevronRight} /></button>
            </div>
            <div className="carousel-item" id="2">
                <button className="carousel-btn left" onClick={(e) => btnCarousel(e, 1)}><FontAwesomeIcon className="btn-icon" icon={faAngleLeft} /></button>
                <div className="item-image">
                    <NavLink onMouseOver={(e) => toProdDetails(e)} onTouchStart={(e) => toProdDetails(e)} to={`/product-detail/${id}`}>
                        <picture>
                            <source srcSet='https://i.ibb.co/Tcf6rvZ/ea-fc-24-carousel-sm2.jpg' media='(width <= 500px)' />
                            <img src="https://i.ibb.co/YjQ8SGY/ea-fc-24-carousel.jpg" alt="EA SPORTS FC 24" />
                        </picture>
                    </NavLink>
                </div>
                <div className="item-text">
                    <h1 className="item-title">EA SPORTS FC 24</h1>
                    <p className="item-desc">Alcanza a la gloria en el mejor juego de futbol!</p>
                </div>
                <button className="carousel-btn right" onClick={(e) => btnCarousel(e, 3)}><FontAwesomeIcon className="btn-icon" icon={faChevronRight} /></button>
            </div>
            <div className="carousel-item" id="3">
                <button className="carousel-btn left" onClick={(e) => btnCarousel(e, 2)}><FontAwesomeIcon className="btn-icon" icon={faAngleLeft} /></button>
                <div className="item-image">
                    <NavLink onMouseOver={(e) => toProdDetails(e)} onTouchStart={(e) => toProdDetails(e)} to={`/product-detail/${id}`}>
                        <picture>
                            <source srcSet='https://i.ibb.co/my0bGnM/Diablo-IV-carousel-sm.png' media='(width <= 500px)' />
                            <img src="https://i.ibb.co/RHHYXnJ/Diablo-IV-carousel.png" alt="DIABLO IV" />
                        </picture>
                    </NavLink>
                </div>
                <div className="item-text">
                    <h1 className="item-title">DIABLO IV</h1>
                    <p className="item-desc">Escoge una clase y únete en la lucha por el santuario en esta saga mítica.</p>
                </div>
                <button className="carousel-btn right" onClick={(e) => btnCarousel(e, 4)}><FontAwesomeIcon className="btn-icon" icon={faChevronRight} /></button>
            </div>
            <div className="carousel-item" id="4">
                <button className="carousel-btn left" onClick={(e) => btnCarousel(e, 3)}><FontAwesomeIcon className="btn-icon" icon={faAngleLeft} /></button>
                <div className="item-image">
                    <NavLink onMouseOver={(e) => toProdDetails(e)} onTouchStart={(e) => toProdDetails(e)} to={`/product-detail/${id}`}>
                        <picture>
                            <source srcSet='https://i.ibb.co/6JHF6KD/hglegacy-carouselsm.jpg' media='(width <= 500px)' />
                            <img src="https://i.ibb.co/D5HdKzX/hogwarts-legacy-carousel.jpg" alt="HOGWARTS LEGACY" />
                        </picture>
                    </NavLink>
                </div>
                <div className="item-text">
                    <h1 className="item-title">Hogwarts Legacy</h1>
                    <p className="item-desc">Vive una aventura llena de magia y fantasía con esta increíble entrega.</p>
                </div>
                <button className="carousel-btn right" onClick={(e) => btnCarousel(e, 1)}><FontAwesomeIcon className="btn-icon" icon={faChevronRight} /></button>
            </div>
        </div>
    );
}

