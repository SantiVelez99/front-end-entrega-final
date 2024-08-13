import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './carousel.css'
import { faAngleLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { useProduct } from '../../context/ProductContext'
import { useEffect, useState } from 'react'

export default function CarouselComponent() {
    const { carouselItems, setCarouselActiveItems, carouselActiveItems, getCarouselItems, baseURL } = useProduct()
    const [timer, setTimer] = useState(0)
    function btnCarousel(id) {
        activeItems(carouselItems)
        const items = Array.from(document.getElementsByClassName("carousel-item"))
        id < 0 ? id = carouselActiveItems.length - 1 : id
        id >= carouselActiveItems.length ? id = 0 : id
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
        console.log(carouselItems)
        activeItems(carouselItems)
        console.log(carouselActiveItems)
    }, [carouselItems])
    useEffect(() => {
        const carouselLoop = () => {
            setTimer((prevContador) => prevContador + 1)
            const activeItem = Array.from(document.getElementsByClassName('carousel-item active'))
            btnCarousel(parseInt(activeItem[0].id) + 1)
        }

        const intervalId = setInterval(carouselLoop, 7000)

        return () => clearInterval(intervalId)
    }, [timer])

    function activeItems(array) {
        array.forEach(item => {
            if(item.active === true && !carouselActiveItems.some(citem => citem._id === item._id)) {
                setCarouselActiveItems([...carouselActiveItems, item])
            }
        })
    }
    return (
        <div className="carousel-container">
            {
                carouselActiveItems.map((item, i = 0) => {
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

