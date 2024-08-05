import { useEffect, useState } from "react";
import { useProduct } from "../../context/ProductContext";
import ProductCard from "../product-card/ProductCard";
import './products-gallery.css'
import Modal from "../../layout/modal/Modal";
import FavouriteModal from "../favouriteModal/FavouriteModal";
import '../categoriesGallery/categoriesGallery.css'
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


export default function ProductsGallery() {
    const { favStar, product, getProducts, isOpen, handleFavList, totalProducts, tags, getTags } = useProduct();
    const [currentPage, setCurrentPage] = useState(0)
    const [prodsPerPage, setProdsPerPage] = useState(6)
    const pageCount = Math.ceil(totalProducts / prodsPerPage);
    const [name, setName] = useState()
    const [tag, setTag] = useState()
    const displayedProds = product.map(producto => {
        return (
            <ProductCard producto={producto} favIcon={favStar(producto)} key={producto._id} />
        )
    })
    const changePage = ({ selected }) => {
        setCurrentPage(selected);
    }
    console.log(product)
    useEffect(() => {
        getProducts({ page: currentPage, limit: prodsPerPage, tag: tag })
    }, [currentPage, prodsPerPage, tag])
    useEffect(() => {
        getTags({})
    }, [])
    useEffect(() => {
        setCurrentPage(0)
    }, [tag])

    function nameSearch(e) {
        e.preventDefault()
        const input = document.getElementById("name")
        setName(input.value)
        console.log(name)
        if (name.length >= 3) {
            getProducts({ name: input.value })
        }
    }
    return (
        <>
            <div className="gallery-container">
                <div className="main-gallery">
                    <h1 className="gallery-title">Nuestros productos:</h1>
                    <div className="search-form">
                        <form onSubmit={(e) => nameSearch(e)}>
                            <label htmlFor="name"></label>
                            <input type="text" name="name" id="name" className="search-input" autoFocus />
                            <button type="submit" htmlFor="name" className="search-button"><FontAwesomeIcon className="icon" icon={faMagnifyingGlass} /></button>
                        </form>
                    </div>

                    {displayedProds}
                    <div className="prod-gallery-pagination">
                        <ReactPaginate
                            previousLabel={<FontAwesomeIcon icon={faCaretLeft} />}
                            nextLabel={<FontAwesomeIcon icon={faCaretRight} />}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName="ul-gallery"
                            activeClassName="active"
                        />

                        <div className="select-container">
                            <label htmlFor="prodPerPage">Productos por pagina: </label>
                            <select name="prodPerPage" id="prodPerPage" defaultValue={6} onChange={(e) => setProdsPerPage(e.target.value)}>
                                <option value={1}>1</option>
                                <option value={3}>3</option>
                                <option value={6}>6</option>
                                <option value={9}>9</option>
                                <option value={12}>12</option>
                            </select>
                        </div>
                    </div>
                </div>
                <Modal isOpen={isOpen} handleModalClose={handleFavList}>
                    <FavouriteModal />
                </Modal>
                <div className="title-container">
                    <h3 className="gallery-title">Busca juegos por su genero</h3>
                    <select className="gallery-select" onChange={(e) => setTag(e.target.value)}>
                        <option className="select-option" value="">Todos los productos</option>
                        {
                            tags?.map((tag) => {
                                return (
                                    <option className="select-option" value={tag._id} key={tag._id}>{tag.viewValue}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
        </>
    )
}