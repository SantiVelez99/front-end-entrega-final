import { useEffect } from "react";
import { useProduct } from "../../context/ProductContext";
import ProductCard from "../product-card/ProductCard";
import './products-gallery.css'

export default function ProductsGallery() {

    const { product, getProducts } = useProduct();
    useEffect(() =>{
        getProducts()
    },[])

    return (
            <div className="main-gallery">

                <h1 className="gallery-title">Lista de productos:</h1>
                {
                    product.map(producto => {
                        return (
                            <ProductCard producto={producto} key={producto.id} />
                        )
                    })
                }
            </div>
    )
}