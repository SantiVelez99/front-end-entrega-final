import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './carousel.css'
import { faAngleLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { useProduct } from '../../context/ProductContext'
import { useEffect, useState } from 'react'

export default function CarouselComponent() {
    const { carouselItems, totalCarouselItems, getCarouselItems, baseURL } = useProduct()
    const [timer, setTimer] = useState(0)
    function btnCarousel(id) {
        const items = Array.from(document.getElementsByClassName("carousel-item"))
        id < 0 ? id = totalCarouselItems - 1 : id
        id >= totalCarouselItems ? id = 0 : id
        items.forEach((item) => {
            if (item.id == id) {
                item.className = "carousel-item active"
            } else {
                item.className = "carousel-item unactive"
            }
        })
    }
    useEffect(() => {
        getCarouselItems({})
    }, [])

    useEffect(() => {
        const carouselLoop = () => {
            setTimer((prevContador) => prevContador + 1)
            // clickCarousel()
            const activeItem = Array.from(document.getElementsByClassName('carousel-item active'))
            btnCarousel(parseInt(activeItem[0].id) + 1)
        }

        const intervalId = setInterval(carouselLoop, 5000)

        return () => clearInterval(intervalId)
    }, [timer])

    // function clickCarousel(){
    //     const activeItem = Array.from(document.getElementsByClassName('carousel-item active'))
    //     btnCarousel(parseInt(activeItem[0].id) + 1)
    // }

    return (
        <div className="carousel-container">
            {
                carouselItems.map((item, i) => {
                    return (
                        <div className={i === 0 ? "carousel-item active" : "carousel-item unactive"} id={i} key={item._id}>
                            <button className="carousel-btn left" onClick={() => btnCarousel(i - 1)}><FontAwesomeIcon className="btn-icon" icon={faAngleLeft} /></button>
                            <div className="item-image">
                                <NavLink to={`/product-detail/${item.product}`}>
                                    <img src={`${baseURL}/images/carouselItems/${item.carouselImage.id}`} alt={item.title} />
                                </NavLink>
                            </div>
                            <div className="item-text">
                                <h1 className="item-title"><NavLink className="link" to={`/product-detail/${item.product}`}>
                                    {item.title}</NavLink></h1>
                                <p className="item-desc">{item.description}</p>
                            </div>
                            <button className="carousel-btn right" onClick={() => btnCarousel(i + 1)}><FontAwesomeIcon className="btn-icon" icon={faChevronRight} /></button>
                        </div>
                    )
                })
            }
        </div>
    );
}

