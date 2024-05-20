import { createContext, useContext, useState } from "react";

const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext)

export const ProductProvider = ( { children } ) => {
    const [product, setProduct] = useState([]);
    const [user, setUser] = useState([
        {id: 1234, userName:"santi"}
    ])
    function addProduct(prodObj){
        setProduct([...product, prodObj])
        console.log(product)
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