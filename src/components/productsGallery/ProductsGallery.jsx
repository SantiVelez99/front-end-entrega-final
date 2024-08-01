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
    const { favStar, product, getProducts, isOpen, handleFavList, totalProducts } = useProduct();
    const [currentPage, setCurrentPage] = useState(0)
    const [ prodsPerPage, setProdsPerPage ] = useState(6)
    const pageCount = Math.ceil(totalProducts / prodsPerPage);
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
        getProducts({ page: currentPage , limit: prodsPerPage })
    }, [currentPage, prodsPerPage])

    return (
        <>
            <div className="gallery-container">
                <div className="main-gallery">
                    <h1 className="gallery-title">Nuestros productos:</h1>
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
            </div>
            <CategoriesGallery />
        </>
    )
}