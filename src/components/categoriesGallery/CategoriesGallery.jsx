import { useState } from "react"
import { useProduct } from "../../context/ProductContext"
import ProductCard from "../product-card/ProductCard"
import './categoriesGallery.css'

export default function CategoriesGallery() {
    const { product, favStar } = useProduct()
    const [tagsArray, setTag] = useState([])
    const [filteredProducts, setFilter] = useState([])
    product.forEach((prod) => {
        prod.productTags.forEach(tag => {
            if (!tagsArray.includes(tag)) {
                setTag([...tagsArray, tag])
            }
        })
    })
    function categoriesFilter(tag) {
        const array = product.filter(prod => prod.productTags.includes(tag))
        setFilter(array)
    }
    if (filteredProducts.length < 1) {
        return (
            <>
                <div className="main-gallery">
                    <div className="title-container">
                        <h3 className="gallery-title">Busca juegos por su genero</h3>
                        <select className="gallery-select" onChange={(e) => categoriesFilter(e.target.value)}>
                            <option className="select-option" value="">Categorias...</option>
                            {
                                tagsArray.map((tag, i) => {
                                    return (
                                        <option className="select-option" value={tag} key={[i]}>{tag}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <h2 className="empty-title">Aun no hay nada aqui...</h2>
                </div>
            </>
        )
    } else {
        return (
            <>
                <section className="main-gallery">
                    <div className="title-container">
                        <h3 className="gallery-title">Busca juegos por su genero</h3>
                        <select className="gallery-select" onChange={(e) => categoriesFilter(e.target.value)}>
                            <option className="select-option" value="">Categorias...</option>
                            {
                                tagsArray.map((tag, i) => {
                                    return (
                                        <option className="select-option" value={tag} key={[i]}>{tag}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="main-gallery">
                        {
                            filteredProducts?.map(producto => {
                                return (
                                    <ProductCard producto={producto} favIcon={favStar(producto)} key={producto.id} />
                                )
                            })
                        }
                    </div>
                </section>
            </>
        )
    }
}