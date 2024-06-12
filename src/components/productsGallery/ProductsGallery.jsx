import { useEffect } from "react";
import { useProduct } from "../../context/ProductContext";
import ProductCard from "../product-card/ProductCard";
import './products-gallery.css'
import Modal from "../../layout/modal/Modal";
import FavouriteModal from "../favouriteModal/FavouriteModal";
import CategoriesGallery from "../categoriesGallery/CategoriesGallery";


export default function ProductsGallery() {

    const { favStar, product, getProducts, isOpen, handleFavList } = useProduct();
    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
        <div className="main-gallery">

            <h1 className="gallery-title">Lista de productos:</h1>
            {
                product.map(producto => {
                    return (
                        <ProductCard producto={producto} favIcon={favStar(producto)} key={producto.id} />
                    )
                })
            }
            <Modal isOpen={isOpen} handleModalClose={handleFavList}>
                <FavouriteModal />
            </Modal>
        </div>
            <CategoriesGallery/>
        </>
    )
}