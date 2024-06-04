import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext)



export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState([]);
    const [user, setUser] = useState([])
    const [editObj, setEditObj] = useState([])
    const mockURL = "https://6622ed463e17a3ac846e4065.mockapi.io/api"
    const [isClosed, setCart] = useState(false)
    const [cartOrder, setCartOrder] = useState(JSON.parse(localStorage.getItem("cartOrder")) || [])
    const [ cartTotal, setTotal] = useState(0)
    const [ cartCount, setCount ] = useState(0)

    // ?CART
    function handleCartClose(isClosed) {
        if (isClosed) setCart(false);
        if (!isClosed) setCart(true)
    }
    function addToCart(product) {
        const producto = cartOrder.find(prod => prod.id === product.id)
        if (producto) {
            handleChangeQuantity(producto.id, producto.quantity + 1)
            setCart(true)
        } else {
            product.quantity = 1;
            setCartOrder([...cartOrder, product])
            setCart(true)
        }
    }
    function handleChangeQuantity(id, quantity) {
        const newOrders = cartOrder.map(prod => {
            if (prod.id === id) {
                prod.quantity = +quantity;
            }
            return prod
        })
        setCartOrder(newOrders)
    }
    function removeListItem(id){
        Swal.fire({
            title: "Remover Producto",
            titleText: "Desea remover este producto del carrito?",
            icon: "warning",
            iconColor:"#911",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Remover",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#900",
            background: "#0E1014",
            color: "#DCDEDF"
        }).then(resultado =>{
            if(resultado.isConfirmed){
                const newOrder = cartOrder.filter(prod => prod.id != id)
                setCartOrder(newOrder)
            }
        })
    }
    function calculateTotal(){
        let totalCount = 0;
        cartOrder.forEach(prod=>{
            totalCount+= prod.productPrice * prod.quantity
        });
        setTotal(totalCount)
    }
    function calculateCount(){
        let count = 0;
        cartOrder.forEach((prod) => {
            count += prod.quantity
            setCount(count)
        })
    }
    useEffect(() =>{
        localStorage.setItem("cartOrder", JSON.stringify(cartOrder))
        calculateTotal();
        calculateCount();
    }, [ cartOrder ])
    // ?CART


    // *AXIOS
    async function getProducts() {
        try {
            const response = await axios.get(`${mockURL}/product`)
            setProduct(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function postProduct(obj) {
        if (obj.id) {
            try {
                await axios.put(`${mockURL}/product/${obj.id}`, obj)
                updateCorrectly("producto")
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await axios.post(`${mockURL}/product`, obj)
                getProducts()
                postCorrect()
            } catch (error) {
                console.log(error)
            }
        }
        getProducts()
    }
    async function deleteMockData(string, id) {
        if (string === "producto") {
            try {
                await axios.delete(`${mockURL}/product/${id}`)
                deleteSuccess(string)
                getProducts()
            } catch (error) {
                console.log(error)
            }
        }
        if (string === "usuario") {
            try {
                await axios.delete(`${mockURL}/user/${id}`)
                deleteSuccess(string)
                getUsers()
            } catch (error) {
                console.log(error)
            }
        }
    }
    async function editMockData(string, id) {
        if (string === "producto") {
            try {
                const response = await axios.get(`${mockURL}/product/${id}`)
                setEditObj(response.data)
                console.log(editObj)
            } catch (error) {
                console.log(error)
            }
        }
        if (string === "usuario") {
            try {
                const response = await axios.get(`${mockURL}/user/${id}`)
                setEditObj(response.data)
                console.log(editObj)
            } catch (error) {
                console.log(error)
            }
        }
    }
    async function getUsers() {
        try {
            const response = await axios.get(`${mockURL}/user`)
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    async function postUser(obj) {
        if (obj.id) {
            try {
                await axios.put(`${mockURL}/user/${obj.id}`, obj)
                updateCorrectly("usuario")
                getUsers()
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await axios.post(`${mockURL}/user`, obj)
                console.log(obj)
                getUsers()
            } catch (error) {
                console.log(error)
            }
        }
    }

    // *FIN AXIOS

    // !SWAL
    function postCorrect() {
        Swal.fire({
            icon: "success",
            title: "Producto Agregado Correctamente",
            background: "#0E1014",
            color: "#DCDEDF",
            confirmButtonText: "Confirmar"
        })
    }
    function deleteConfirm(string, id) {
        Swal.fire({
            icon: "warning",
            iconColor: "#922",
            title: `Borrar ${string}`,
            text: `Desea Borrar este ${string}?`,
            showConfirmButton: true,
            confirmButtonColor: "#900",
            confirmButtonText: "Borrar",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            background: "#0E1014",
            color: "#DCDEDF"
        }).then((res) => {
            if (res.isConfirmed) {
                deleteMockData(string, id)
            }
        })
    }
    function deleteSuccess(string) {
        Swal.fire({
            icon: "success",
            title: `El ${string} se ha borrado correctamente`,
            background: "#0E1014",
            color: "#DCDEDF",
            confirmButtonText: "Confirmar"
        })
    }

    function updateCorrectly(string) {
        Swal.fire({
            icon: "success",
            title: `El ${string} se ha actualizado correctamente`,
            background: "#0E1014",
            color: "#DCDEDF",
            confirmButtonText: "Confirmar"
        })
    }
    // !FIN SWAL

    return (
        <ProductContext.Provider value={{
            product, user, editObj, isClosed, cartOrder, cartTotal, cartCount, addToCart, handleChangeQuantity, removeListItem,
            handleCartClose, setEditObj, getProducts, postProduct, getUsers, postUser, deleteConfirm, editMockData
        }}>
            {children}
        </ProductContext.Provider>
    )
}