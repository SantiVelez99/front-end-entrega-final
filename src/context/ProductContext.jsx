import { createContext, useContext, useState } from "react";

const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext)

export const ProductProvider = ( { children } ) => {
    const [product, setProduct] = useState([
        {id: 121, productName:"xbox", image:"https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png", productPrice:800, quantity:1}
    ]);
    const [user, setUser] = useState([
        {id: 1234, userName:"santi"}
    ])
    function addProduct(prodObj){
        setProduct([...product, prodObj])
    }
    function addUser(userObj){
        setUser([ ...user, userObj])
        console.log(user)
    }

    return(
        <ProductContext.Provider value={{product, user, addProduct, addUser}}>
            {children}
        </ProductContext.Provider>
    )
}