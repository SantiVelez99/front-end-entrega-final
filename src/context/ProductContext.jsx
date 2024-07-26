import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import toastr from "toastr";
import 'toastr/build/toastr.min.css'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import useApi from "../services/interceptor/interceptor";

const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext)



export const ProductProvider = ({ children }) => {
    const url = import.meta.env.VITE_URL
    const baseURL = import.meta.env.VITE_BASE_URL
    const api = useApi()
    const [product, setProduct] = useState([]);
    const [user, setUser] = useState([])
    const [editObj, setEditObj] = useState([])
    // const mockURL = "https://6622ed463e17a3ac846e4065.mockapi.io/api"
    const [isClosed, setCart] = useState(false)
    const [cartOrder, setCartOrder] = useState(JSON.parse(localStorage.getItem("cartOrder")) || [])
    const [cartTotal, setTotal] = useState(0)
    const [cartCount, setCount] = useState(0)
    const [favList, setFavList] = useState(JSON.parse(localStorage.getItem("favList")) || [])
    const [isOpen, setFavListOpen] = useState(false)
    const [tags, setTags] = useState()


    // *FAVLIST

    function addToFavList(producto) {
        const product = favList.find(prod => prod.id === producto.id)
        if (!product) {
            setFavList([...favList, producto])
            toastSuccessAlert("add", "favList")
            handleFavList()
        }
        if (product) {
            const newOrder = favList.filter(prod => prod.id != producto.id)
            setFavList(newOrder)
            toastSuccessAlert("remove", "favList")
        }
    }
    function handleFavList() {
        if (isOpen) setFavListOpen(false)
        if (!isOpen) setFavListOpen(true)
    }
    function favStar(product) {
        let isIn = false
        favList.forEach(prod => {
            if (prod.id == product.id) isIn = true
        })
        if (isIn) return faStar
        if (!isIn) return faStarEmpty
    }
    useEffect(() => {
        localStorage.setItem("favList", JSON.stringify(favList))
    }, [favList])
    // *FIN FAVLIST



    // ?CART
    function handleCartClose(isClosed) {
        if (isClosed) setCart(false);
        if (!isClosed) setCart(true)
    }
    function addToCart(product) {
        console.log(product)
        const producto = cartOrder.find(prod => prod._id === product._id)
        if (producto) {
            console.log(producto)
            handleChangeQuantity(producto._id, producto.quantity + 1)
            setCart(true)
        } else {
            product.quantity = 1;
            setCartOrder([...cartOrder, product])
            setCart(true)
            toastSuccessAlert("add", "cart")
        }
    }
    function handleChangeQuantity(id, quantity, operator) {
        const newOrders = cartOrder.map(prod => {
            if (operator === "-" && prod._id === id) {
                prod.quantity += -1
                if (prod.quantity < 1) {
                    removeListItem(prod._id)
                    prod.quantity = 1
                }
            }
            if (operator === "+" && prod._id === id) {
                prod.quantity += 1
            }
            if (prod._id === id && !operator) {
                if (quantity > 0) {
                    prod.quantity = +quantity;
                }
                if (quantity < 1) {
                    removeListItem(prod._id)
                    prod.quantity = 1
                }
            }
            return prod
        })
        setCartOrder(newOrders)
    }
    function removeListItem(id) {
        Swal.fire({
            title: "Remover Producto",
            titleText: "Desea remover este producto del carrito?",
            icon: "warning",
            iconColor: "#911",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Remover",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#900",
            background: "#0E1014",
            color: "#DCDEDF"
        }).then(resultado => {
            if (resultado.isConfirmed) {
                const newOrder = cartOrder.filter(prod => prod._id != id)
                toastSuccessAlert("remove", "cart")
                setCartOrder(newOrder)
                if (cartOrder.length <= 1) setCount(0)
            }
        })
    }
    function calculateTotal() {
        let totalCount = 0;
        cartOrder.forEach(prod => {
            totalCount += prod.productPrice * prod.quantity
        });
        setTotal(totalCount)
    }
    function calculateCount() {
        let count = 0;
        cartOrder.forEach((prod) => {
            count += prod.quantity
            setCount(count)
        })
    }
    function checkOut(obj){

    }
    useEffect(() => {
        localStorage.setItem("cartOrder", JSON.stringify(cartOrder))
        calculateTotal();
        calculateCount();
    }, [cartOrder])
    // ?CART


    // *AXIOS
    async function getProducts() {
        try {
            const response = await axios.get(`${url}/products`)
            setProduct(response.data.products)
        } catch (error) {
            console.log(error)
        }
    }
    async function postProduct(formData) {
        const id = formData.get("id")
        formData.get("productImage") === "false" ? formData.delete("productImage") : null
        formData.get("productPortrait") === "false" ? formData.delete("productPortrait") : null
        formData.get("productDescPictures") === "false" ? formData.delete("productDescPictures") : null
        if (id !== "undefined") {
            try {
                await api.put(`${url}/products/${id}`, formData)
                updateCorrectly("producto")
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await api.post(`${url}/products`, formData)
                getProducts()
                postCorrect("producto")
            } catch (error) {
                console.log(error)
            }
        }
        getProducts()
    }
    async function deleteMockData(string, id) {
        if (string === "producto") {
            try {
                await api.delete(`${url}/products/${id}`)
                deleteSuccess(string)
                getProducts()
            } catch (error) {
                console.log(error)
            }
        }
        if (string === "usuario") {
            try {
                await api.delete(`${url}/users/${id}`)
                deleteSuccess(string)
                getUsers()
            } catch (error) {
                console.log(error)
            }
        }
        if (string === "tag") {
            try {
                await api.delete(`${url}/tags/${id}`)
                deleteSuccess(string)
                getTags()
            } catch (error) {
                console.log(error)
            }
        }
    }
    async function editMockData(string, id) {
        if (string === "producto") {
            try {
                const response = await axios.get(`${url}/products/${id}`)
                setEditObj(response.data.product)
            } catch (error) {
                console.log(error)
            }
        }
        if (string === "usuario") {
            try {
                const response = await axios.get(`${url}/users/${id}`)
                setEditObj(response.data.user)
            } catch (error) {
                console.log(error)
            }
        }
        if (string === "tag") {
            try {
                const response = await axios.get(`${url}/tags/${id}`)
                setEditObj(response.data.tag)
            } catch (error) {
                console.log(error)
            }
        }
    }
    async function getUsers() {
        try {
            const response = await axios.get(`${url}/users`)
            setUser(response.data.users)
        } catch (error) {
            console.log(error)
        }
    }
    async function postUser(obj) {
        const id = obj.get("id")
        if (obj.get("userAvatar") === "false") obj.delete("userAvatar")
        if (id) {
            try {
                await api.put(`${url}/users/${id}`, obj)
                updateCorrectly("usuario")
                getUsers()
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await axios.post(`${url}/users`, obj)
                getUsers()
                postCorrect("usuario")
            } catch (error) {
                console.log(error)
            }
        }
    }
    async function getTags() {
        try {
            const response = await axios.get(`${url}/tags`)
            setTags(response.data.tags)
        } catch (error) {
            console.log(error)
        }
    }
    async function postTag(obj) {
        console.log(obj)
        console.log(obj._id)
        // const id = obj.get("id")
        if (obj._id) {
            try {
                await api.put(`${url}/tags/${obj._id}`, obj)
                getTags()
                updateCorrectly("tag")
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await api.post(`${url}/tags`, obj)
                getTags()
                postCorrect("tag")
            } catch (error) {
                console.log(error)
            }
        }
    }
    // *FIN AXIOS

    // !SWAL
    function postCorrect(string) {
        Swal.fire({
            icon: "success",
            title: `El ${string} se ha creado correctamente`,
            background: "#0E1014",
            color: "#DCDEDF",
            confirmButtonText: "Confirmar",
            timer: 2000
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
            confirmButtonText: "Confirmar",
            timer: 2000
        })
    }

    function updateCorrectly(string) {
        Swal.fire({
            icon: "success",
            title: `El ${string} se ha actualizado correctamente`,
            background: "#0E1014",
            color: "#DCDEDF",
            confirmButtonText: "Confirmar",
            timer: 2000
        })
    }
    // !FIN SWAL

    // ?TOASTR
    function toastSuccessAlert(value, list) {
        toastr.options = {
            progressBar: true,
            positionClass: "toast-bottom-center",
            timeOut: "2000"
        }
        if (list === "cart") {
            switch (value) {
                case "add":
                    toastr.success('Producto agregado al carrito');
                    break;
                case "remove":
                    toastr.warning('Producto eliminado del carrito');
                    break;
            }
        }
        if (list === "favList") {
            switch (value) {
                case "add":
                    toastr.success('Producto agregado a la lista');
                    break;
                case "remove":
                    toastr.warning('Producto eliminado de la lista');
                    break;
            }
        }
    }

    // ?FIN TOASTR

    function handleReload(e) {
        e.preventDefault();
        window.location.href = e.currentTarget.href;
    }
    return (
        <ProductContext.Provider value={{
            product, user, editObj, isClosed, cartOrder, cartTotal, cartCount, isOpen, favList, handleReload, favStar, handleFavList, addToFavList, addToCart, handleChangeQuantity, removeListItem,
            handleCartClose, setEditObj, getProducts, postProduct, getUsers, postUser, deleteConfirm, editMockData, baseURL, url, tags, getTags, postTag, checkOut
        }}>
            {children}
        </ProductContext.Provider>
    )
}