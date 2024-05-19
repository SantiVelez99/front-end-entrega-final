import { createContext, useContext, useState } from "react";

const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext)

export const ProductProvider = ( { children } ) => {
    const [product, setProduct] = useState([
        {id: 121, name:"xbox", image:"https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png", price:800, quantity:1}
    ]);

    function addProduct(prodObj){
        setProduct([...product, prodObj])
    }

    return(
        <ProductContext.Provider value={{product, setProduct, addProduct}}>
            {children}
        </ProductContext.Provider>
    )
}