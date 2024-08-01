import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import toastr from "toastr";
import 'toastr/build/toastr.min.css'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import useApi from "../services/interceptor/interceptor";
import { useUser } from "./UserContext";

const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext)

export const ProductProvider = ({ children }) => {
    const url = import.meta.env.VITE_URL
    const baseURL = import.meta.env.VITE_BASE_URL
    const api = useApi()
    const { user } = useUser()
    const [product, setProduct] = useState([]);
    const [ totalProducts, setTotalProducts ] = useState(0)
    const [users, setUser] = useState([])
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
        const product = favList.find(prod => prod._id === producto._id)
        if (!product) {
            setFavList([...favList, producto])
            toastSuccessAlert("add", "favList")
            handleFavList()
        }
        if (product) {
            const newOrder = favList.filter(prod => prod._id != producto._id)
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
            if (prod._id == product._id) isIn = true
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
        })
        setCount(count)
    }
    async function checkOut(obj){
        let prods = []
        obj.forEach((prod, i) => {
            prods[i] = {
                product: prod._id,
                price: prod.productPrice,
                quantity: prod.quantity
            }
        })
        if(user._id){
            const order = {
                user: user._id,
                products: prods,
                total: cartTotal
            }
            const response = await api.post(`${url}/orders`, order)
            postCorrect(response.data.message)
        console.log(order)
        setCartOrder([])
        }
    }
    useEffect(() => {
        localStorage.setItem("cartOrder", JSON.stringify(cartOrder))
        calculateTotal()
        calculateCount()
    }, [cartOrder])
    // ?CART


    // *AXIOS
    async function getProducts({ page = 0, limit , tag }) {
        try {
            const tagQuery = tag? `&tag=${tag}` : ''
            const response = await axios.get(`${url}/products?page=${page}&limit=${limit}${tagQuery}`)
            setProduct(response.data.products)
            setTotalProducts(response.data.total)
            console.log(page)
            console.log(limit)
            console.log(totalProducts)
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
                const response = await api.put(`${url}/products/${id}`, formData)
                updateCorrectly(response.data.message)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const response = await api.post(`${url}/products`, formData)
                getProducts({})
                postCorrect(response.data.message)
            } catch (error) {
                console.log(error)
            }
        }
        getProducts({})
    }
    async function deleteMockData(string, id) {
        if (string === "producto") {
            try {
                const response = await api.delete(`${url}/products/${id}`)
                deleteSuccess(response.data.message)
                getProducts({})
            } catch (error) {
                console.log(error)
            }
        }
        if (string === "usuario") {
            try {
                const response = await api.delete(`${url}/users/${id}`)
                deleteSuccess(response.data.message)
                getUsers()
            } catch (error) {
                console.log(error)
            }
        }
        if (string === "tag") {
            try {
                const response = await api.delete(`${url}/tags/${id}`)
                deleteSuccess(response.data.message)
                getTags()
            } catch (error) {
                console.log(error)
            }
        }
        if (string === "order") {
            try {
                const response = await api.delete(`${url}/orders/${id}`)
                deleteSuccess(response.data.message)
            } catch (error) {
                console.log(error)
            }
        }
    }
    async function editMockData(string, id) {
        if (string === "producto") {
            try {
                const response = await api.get(`${url}/products/${id}`)
                setEditObj(response.data.product)
            } catch (error) {
                console.log(error)
            }
        }
        if (string === "usuario") {
            try {
                const response = await api.get(`${url}/users/${id}`)
                setEditObj(response.data.user)
            } catch (error) {
                console.log(error)
            }
        }
        if (string === "tag") {
            try {
                const response = await api.get(`${url}/tags/${id}`)
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
        if (id !== "undefined") {
            try {
                const response = await api.put(`${url}/users/${id}`, obj)
                updateCorrectly(response.data.message)
                getUsers()
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const response = await axios.post(`${url}/users`, obj)
                getUsers()
                postCorrect(response.data.message)
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
        if (obj._id) {
            try {
                const response = await api.put(`${url}/tags/${obj._id}`, obj)
                getTags()
                updateCorrectly(response.data.message)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const response = await api.post(`${url}/tags`, obj)
                getTags()
                postCorrect(response.data.message)
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
            title: string,
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
            title: `Desea Borrar esto?`,
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
            title: string,
            background: "#0E1014",
            color: "#DCDEDF",
            confirmButtonText: "Confirmar",
            timer: 2000
        })
    }

    function updateCorrectly(string) {
        Swal.fire({
            icon: "success",
            title: string,
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
            product, users, editObj, isClosed, cartOrder, cartTotal, cartCount, isOpen, favList, handleReload, favStar, handleFavList, addToFavList, addToCart, handleChangeQuantity, removeListItem,
            handleCartClose, setEditObj, getProducts, postProduct, getUsers, postUser, deleteConfirm, editMockData, baseURL, url, tags, getTags, postTag, checkOut, totalProducts
        }}>
            {children}
        </ProductContext.Provider>
    )
}