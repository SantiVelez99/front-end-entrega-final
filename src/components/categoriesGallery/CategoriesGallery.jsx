import { useState } from "react"
import { useProduct } from "../../context/ProductContext"
import ProductCard from "../product-card/ProductCard"
import './categoriesGallery.css'
import ReactPaginate from "react-paginate"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons"

export default function CategoriesGallery() {
    const { product, favStar } = useProduct()
    const [tagsArray, setTag] = useState([])
    const [filteredProducts, setFilter] = useState([])
    // product.forEach((prod) => {
    //     prod.productTags.forEach(tag => {
    //         if (!tagsArray.includes(tag)) {
    //             setTag([...tagsArray, tag])
    //         }
    //     })
    // })
    // function categoriesFilter(tag) {
    //     const array = product.filter(prod => prod.productTags.includes(tag))
    //     setFilter(array)
    // }
    const [currentPage, setCurrentPage] = useState(0)
    const prodsPerPage = 3
    const pagesVisited = currentPage * prodsPerPage
    const pageCount = Math.ceil(filteredProducts.length / prodsPerPage);
    const displayedProds = filteredProducts.slice(pagesVisited, pagesVisited + prodsPerPage).map(producto => {
        return (
            <ProductCard producto={producto} favIcon={favStar(producto)} key={producto.id} />
        )
    })
    const changePage = ({ selected }) => {
        setCurrentPage(selected);
    }
    if (filteredProducts.length < 1) {
        return (
            <>
                <div className="gallery-container">
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
                        <h2 className="empty-title">Aun no hay nada aqui...</h2>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <section className="gallery-container">
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
                            {displayedProds}
                            <ReactPaginate
                                previousLabel={<FontAwesomeIcon icon={faCaretLeft} />}
                                nextLabel={<FontAwesomeIcon icon={faCaretRight} />}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName="ul-gallery"
                                activeClassName="active"
                            />
                    </div>
                </section>
            </>
        )
    }
}