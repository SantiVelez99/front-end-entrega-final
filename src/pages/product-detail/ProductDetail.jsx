import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import './product-detail.css'
import DateFormat from "../../utilities/dateFormat/DateFormat";
import { useProduct } from "../../context/ProductContext";
import Modal from "../../layout/modal/Modal";
import TagsModal from "../../components/tagsModal/TagsModal";

export default function ProductDetail() {
    const { id } = useParams();
    const { addToCart, getProducts, url, baseURL } = useProduct()

    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState([true]);
    const [ isOpen, setIsOpen ] = useState(false)
    const [ tag, setTag ] = useState()
    async function getProdByID(id) {
        try {
            const response = await axios.get(`${url}/products/${id}`)
            setProduct(response.data.product)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getProdByID(id);
        getProducts()
    }, [])
    function handleModalOpen(e){
        if(!isOpen) {
            setTag(e.target.innerText)
            setIsOpen(true)
        }
        if(isOpen) setIsOpen(false)
        }
    if (loading) {
        return (
            <h4>CARGANDO...</h4>
        )
    }
    return (
        <main className="main-container">
            <div className="product-container">
                <div className="product-header">
                    <img className="product-header-img" src={`${baseURL}/images/products/portrait-images/${product.productPortrait.id}`}
                        alt="Elden Ring header"/>
                        <div className="product-info">
                            <div className="product-description">
                                <div className="underline">
                                    <h1 className="product-title">{product.productName}</h1>
                                </div>
                                <p className="description-short">
                                    {product.productDesc}
                                </p>
                            </div>
                            <div className="developers">
                                <ul className="dev-list">
                                    Desarrollador:
                                    <NavLink className="title-link" to="#">
                                        <li className="dev-list-item">{product.productDeveloper}</li>
                                    </NavLink>
                                </ul>
                            </div>
                            <div className="release-date">
                                Fecha de salida: {DateFormat(product.productDate)}
                            </div>
                            <div className="product-categories">
                                <h4>Categorias:</h4>
                                <ul className="categories-list">
                                    {
                                    product.productTags.map(tag => {
                                        return(
                                    <NavLink className="title-link" key={crypto.randomUUID()} onClick={(e) => handleModalOpen(e)}>
                                        <li className="categories-list-item">{tag.viewValue}</li>
                                    </NavLink>
                                        )
                                    })}
                                    
                                </ul>
                            </div>
                        </div>
                </div>
                <div className="video-container">
                    <iframe className="product-video" width="560" height="315"
                        src={`${product.productVideo}&amp;controls=1&amp;start=0&mute=1&autoplay=1&rel=0`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen></iframe>
                </div>
                <div className="buy-section">
                    <h3>Comprar {product.productName}</h3>
                    <div className="price-add-to-cart">
                        <span className="product-price">${product.productPrice}USD</span>
                        <NavLink className="game-link"><button type="submit" className="add-to-cart-button" onClick={() => addToCart(product)}>Añadir al
                            carro</button></NavLink>
                    </div>
                </div>

                <section className="extra-info-section">
                    <div className="extra-description">
                        <div className="underline">
                            <h2 className="game-title">Acerca de {product.productName}</h2>
                        </div>
                        <img className="extra-description-img"
                            src={`${baseURL}/images/products/extra-images/${product.productDescPictures[0].id}`} alt={`${product.producName} ${product.productDescPictures[0].name}`} />
                            {
                                product.productDesc.split("\n").map((paragraph, i) =>{
                                    return(
                                        <p className="extra-description-text" key={i}>{paragraph}</p>
                                    )
                                })
                            }
                    </div>
                    <div className="system-requirements">
                        <ul className="minimun">
                            <div className="underline">Requisitos mínimos</div>
                            <li className="requirement-list-item">SO: {product.productMinReq.productSoMin}</li>
                            <li className="requirement-list-item">CPU: {product.productMinReq.productCPUMin}</li>
                            <li className="requirement-list-item">RAM: {product.productMinReq.productRAMMin}</li>
                            <li className="requirement-list-item">GPU: {product.productMinReq.productGPUMin}</li>
                            <li className="requirement-list-item">Espacio: {product.productMinReq.productSpaceMin}</li>
                        </ul>
                        <ul className="recommended">
                            <div className="underline">Requisitos recomendados</div>
                            <li className="requirement-list-item">SO: {product.productMaxReq.productSoRec}</li>
                            <li className="requirement-list-item">CPU: {product.productMaxReq.productCPURec}</li>
                            <li className="requirement-list-item">RAM: {product.productMaxReq.productRAMRec}</li>
                            <li className="requirement-list-item">GPU: {product.productMaxReq.productGPURec}</li>
                            <li className="requirement-list-item">Espacio: {product.productMaxReq.productSpaceRec}</li>
                        </ul>
                    </div>
                    <div className="extra-images">
                        <div className="main-extra-img-container">
                            <img loading="lazy" src={`${baseURL}/images/products/extra-images/${product.productDescPictures[1].id}`} alt={`${product.producName} ${product.productDescPictures[1].name}`}
                                className="extra-img" />
                        </div>
                        <div className="small-extra-images">
                            <div className="extra-img-container">
                                <img loading="lazy"
                                    src={`${baseURL}/images/products/extra-images/${product.productDescPictures[2].id}`} alt={`${product.producName} ${product.productDescPictures[2].name}`} className="extra-img" />
                            </div>
                            <div className="extra-img-container">
                                <img loading="lazy"
                                    src={`${baseURL}/images/products/extra-images/${product.productDescPictures[3].id}`} alt={`${product.producName} ${product.productDescPictures[3].name}`} className="extra-img" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Modal handleModalClose={handleModalOpen} isOpen={isOpen}>
                <TagsModal tag={tag} producto={product}/>
            </Modal>
        </main>
    )
}