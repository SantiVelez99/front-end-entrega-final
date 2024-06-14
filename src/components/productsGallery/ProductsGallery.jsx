import { useEffect, useState } from "react";
import { useProduct } from "../../context/ProductContext";
import ProductCard from "../product-card/ProductCard";
import './products-gallery.css'
import Modal from "../../layout/modal/Modal";
import FavouriteModal from "../favouriteModal/FavouriteModal";
import CategoriesGallery from "../categoriesGallery/CategoriesGallery";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";


export default function ProductsGallery() {
    const { favStar, product, getProducts, isOpen, handleFavList } = useProduct();
    const [currentPage, setCurrentPage] = useState(0)
    const prodsPerPage = 6
    const pagesVisited = currentPage * prodsPerPage
    const pageCount = Math.ceil(product.length / prodsPerPage);
    const displayedProds = product.slice(pagesVisited, pagesVisited + prodsPerPage).map(producto => {
        return (
            <ProductCard producto={producto} favIcon={favStar(producto)} key={producto.id} />
        )
    })
    const changePage = ({ selected }) => {
        setCurrentPage(selected);
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <div className="gallery-container">
                <div className="main-gallery">
                    <h1 className="gallery-title">Nuestros productos:</h1>
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
                <Modal isOpen={isOpen} handleModalClose={handleFavList}>
                    <FavouriteModal />
                </Modal>
            </div>
            <CategoriesGallery />
        </>
    )
}