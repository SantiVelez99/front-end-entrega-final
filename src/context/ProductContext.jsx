import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import toastr from "toastr";
import 'toastr/build/toastr.min.css'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import useApi from "../services/interceptor/interceptor";
import { useUser } from "./UserContext";
import { Navigate, useNavigate } from "react-router-dom";

const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext)

export const ProductProvider = ({ children }) => {
    const url = import.meta.env.VITE_URL
    const baseURL = import.meta.env.VITE_BASE_URL
    const api = useApi()
    const navigate = useNavigate()
    const { user } = useUser()
    const [product, setProduct] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0)
    const [users, setUser] = useState([])
    const [editObj, setEditObj] = useState([])
    const [isClosed, setCart] = useState(false)
    const [cartOrder, setCartOrder] = useState(JSON.parse(localStorage.getItem("cartOrder")) || [])
    const [cartTotal, setTotal] = useState(0)
    const [cartCount, setCount] = useState(0)
    const [favList, setFavList] = useState(JSON.parse(localStorage.getItem("favList")) || [])
    const [isOpen, setFavListOpen] = useState(false)
    const [tags, setTags] = useState()
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalTags, setTotalTags] = useState(0)
    const [orders, setOrders] = useState([])
    const [totalOrders, setTotalOrders] = useState(0)
    const [carouselItems, setCarouselItems] = useState([])
    const [totalCarouselItems, setTotalCarouselItems] = useState(0)
    const [carouselActiveItems, setCarouselActiveItems] = useState([])
    const [tickets, setTickets] = useState([])
    const [totalTickets, setTotalTickets] = useState(0)
    const [favListDB, setFavListDB] = useState({})
    // *FAVLIST

    async function getUserFavList(userID) {
        try {
            const response = await api.get(`${url}/favList/${userID}`)
            if(response.data.list.length === 0){
                postFavList([])
            } else {
                setFavList(response.data.list[0].favList)
                setFavListDB(response.data.list[0])
            }
            console.log(favList)
            console.log(favListDB)
        } catch (error) {
            console.log(error)
        }
    }
    async function updateFavList(listID, array) {
        try {
            console.log(favListDB._id)
            const obj = {
                user: user._id,
                favList: array
            }
            const response = await api.put(`${url}/favList/${listID}`, obj)
            console.log(response.data)

        } catch (error) {
            console.log(error)
        }
    }
    async function postFavList(array) {
        try {
            const obj = {
                user: user._id,
                favList: array
            }
            const response = await api.post(`${url}/favList`, obj)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (user._id) {
            getUserFavList(user._id)
        }
    }, [user])

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
        let array = []
        favList.forEach(item => {
            array.push(item._id)
        })
        if (user._id && favListDB._id) {
            updateFavList(favListDB._id, array)
        }
        else {
            localStorage.setItem("favList", JSON.stringify(favList))
        }
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
    async function checkOut(obj) {
        let prods = []
        obj.forEach((prod, i) => {
            prods[i] = {
                product: prod._id,
                price: prod.productPrice,
                quantity: prod.quantity
            }
        })
        if (user._id) {
            const order = {
                user: user._id,
                userName: user.userName,
                userEmail: user.userEmail,
                products: prods,
                total: cartTotal
            }
            try {
                const response = await api.post(`${url}/orders`, order)
                postCorrect(response.data.message)
                console.log(order)
                setCartOrder([])
            } catch (error) {
                console.log(error)
            }
        } else {
            throw new Error(Swal.fire({
                icon: "error",
                title: "Error",
                titleText: "Para realizar una compra debe ingresar con su cuenta",
                showConfirmButton: true,
                confirmButtonText: "Ingresar",
                background: "#0E1014",
                color: "#DCDEDF"
            }).then(res => {
                if (res.isConfirmed) {
                    navigate("/login")
                }
            })
            );

        }
    }
    useEffect(() => {
        localStorage.setItem("cartOrder", JSON.stringify(cartOrder))
        calculateTotal()
        calculateCount()
    }, [cartOrder])
    // ?CART


    // *AXIOS
    async function getProducts({ page = 0, limit = 100, tag, name }) {
        try {
            const nameQuery = name ? `&name=${name}` : ''
            const tagQuery = tag ? `&tag=${tag}` : ''
            const response = await axios.get(`${url}/products?page=${page}&limit=${limit}${tagQuery}${nameQuery}`)
            setProduct(response.data.products)
            setTotalProducts(response.data.total)
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
                getUsers({})
            } catch (error) {
                console.log(error)
            }
        }
        if (string === "tag") {
            try {
                const response = await api.delete(`${url}/tags/${id}`)
                deleteSuccess(response.data.message)
                getTags({})
            } catch (error) {
                console.log(error)
            }
        }
        if (string === "order") {
            try {
                const response = await api.delete(`${url}/orders/${id}`)
                deleteSuccess(response.data.message)
                getOrders({})
            } catch (error) {
                console.log(error)
            }
        }
        if (string === "carousel") {
            try {
                const response = await api.delete(`${url}/carouselItems/${id}`)
                deleteSuccess(response.data.message)
                getCarouselItems({})
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
        if (string === "carousel") {
            try {
                const response = await api.get(`${url}/carouselItems/${id}`)
                setEditObj(response.data.item)
            } catch (error) {
                console.log(error)
            }
        }
    }
    async function getUsers({ page = 0, limit = 100, name, email }) {
        try {
            const nameQuery = name ? `&name=${name}` : ''
            const emailQuery = email ? `&email=${email}` : ''
            const response = await axios.get(`${url}/users?page=${page}&limit=${limit}${nameQuery}${emailQuery}`)
            setUser(response.data.users)
            setTotalUsers(response.data.total)
        } catch (error) {
            console.log(error)
        }
    }
    async function postUser(obj) {
        const id = obj.get("id")
        console.log(id)
        if (obj.get("userAvatar") === "false") obj.delete("userAvatar")
        if (id !== "" && id !== "undefined") {
            try {
                obj.delete("userPassword")
                const response = await api.put(`${url}/users/${id}`, obj)
                updateCorrectly(response.data.message)
                getUsers({})
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const response = await axios.post(`${url}/users`, obj)
                getUsers({})
                postCorrect(response.data.message)
            } catch (error) {
                console.log(error)
            }
        }
    }
    async function getTags({ page = 0, limit = 100, name }) {
        try {
            const nameQuery = name ? `&name=${name}` : ''
            const response = await axios.get(`${url}/tags?page=${page}&limit=${limit}${nameQuery}`)
            setTags(response.data.tags)
            setTotalTags(response.data.total)
        } catch (error) {
            console.log(error)
        }
    }
    async function postTag(obj) {
        if (obj._id) {
            try {
                const response = await api.put(`${url}/tags/${obj._id}`, obj)
                getTags({})
                updateCorrectly(response.data.message)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const response = await api.post(`${url}/tags`, obj)
                getTags({})
                postCorrect(response.data.message)
            } catch (error) {
                console.log(error)
            }
        }
    }
    async function getOrders({ page = 0, limit = 100, name, email }) {
        try {
            const nameQuery = name ? `&name=${name}` : ''
            const emailQuery = email ? `&email=${email}` : ''
            const response = await api.get(`${url}/orders?page=${page}&limit=${limit}${nameQuery}${emailQuery}`)
            console.log(response.data)
            setOrders(response.data.orders)
            setTotalOrders(response.data.total)
        } catch (error) {
            console.log(error)
        }
    }
    async function getCarouselItems({ page = 0, limit = 100, name }) {
        try {
            const nameQuery = name ? `&name=${name}` : ''
            const response = await axios.get(`${url}/carouselItems?page=${page}&limit=${limit}${nameQuery}`)
            setCarouselItems(response.data.items)
            setTotalCarouselItems(response.data.total)
        } catch (error) {
            console.log(error)
        }
    }
    async function postCarouselItem(formData) {
        try {
            const id = formData.get("id")
            if (formData.get("carouselImage" === "false")) formData.delete("carouselImage")
            if (id !== "undefined") {
                try {
                    const response = await api.put(`${url}/carouselItems/${id}`, formData)
                    updateCorrectly(response.data.message)
                    getCarouselItems({})
                } catch (error) {
                    console.log(error)
                }
            } else {
                try {
                    const response = await api.post(`${url}/carouselItems`, formData)
                    postCorrect(response.data.message)
                    getCarouselItems({})
                } catch (error) {
                    console.log(error)
                }
            }

        } catch (error) {
            console.log(error)
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
    const sortTable = (value, operation, e, type) => {
        if (type === "product") {
            if (value === "productName") {
                if (operation === "asc") {
                    const sortProduct = product.sort((a, b) => b[value].localeCompare(a[value]))
                    e.target.classList = "display-off"
                    e.target.nextSibling.classList = "sort-button"
                    setProduct([...sortProduct])
                }
                if (operation === "desc") {
                    e.target.classList = "display-off"
                    e.target.previousSibling.classList = "sort-button"
                    const sortProduct = product.sort((a, b) => a[value].localeCompare(b[value]))
                    setProduct([...sortProduct])
                }
            } else {
                if (operation === "asc") {
                    const sortProduct = product.sort((a, b) => b[value] - a[value])
                    e.target.classList = "display-off"
                    e.target.nextSibling.classList = "sort-button"
                    setProduct([...sortProduct])
                }
                if (operation === "desc") {
                    e.target.classList = "display-off"
                    e.target.previousSibling.classList = "sort-button"
                    const sortProduct = product.sort((a, b) => a[value] - b[value])
                    setProduct([...sortProduct])
                }
            }
        }
        if (type === "tag") {
            if (operation === "asc") {
                const sortProduct = tags.sort((a, b) => b[value].localeCompare(a[value]))
                e.target.classList = "display-off"
                e.target.nextSibling.classList = "sort-button"
                setTags([...sortProduct])
            }
            if (operation === "desc") {
                e.target.classList = "display-off"
                e.target.previousSibling.classList = "sort-button"
                const sortProduct = tags.sort((a, b) => a[value].localeCompare(b[value]))
                setTags([...sortProduct])
            }
        }
        if (type === "carousel") {
            if (operation === "asc") {
                const sortProduct = carouselItems.sort((a, b) => b[value].localeCompare(a[value]))
                e.target.classList = "display-off"
                e.target.nextSibling.classList = "sort-button"
                setTags([...sortProduct])
            }
            if (operation === "desc") {
                e.target.classList = "display-off"
                e.target.previousSibling.classList = "sort-button"
                const sortProduct = carouselItems.sort((a, b) => a[value].localeCompare(b[value]))
                setTags([...sortProduct])
            }
        }
        if (type === "users") {
            if (operation === "asc") {
                const sortProduct = users.sort((a, b) => b[value].localeCompare(a[value]))
                e.target.classList = "display-off"
                e.target.nextSibling.classList = "sort-button"
                setTags([...sortProduct])
            }
            if (operation === "desc") {
                e.target.classList = "display-off"
                e.target.previousSibling.classList = "sort-button"
                const sortProduct = users.sort((a, b) => a[value].localeCompare(b[value]))
                setTags([...sortProduct])
            }
        }
        if (type === "orders") {
            if (value === "total" || value === "createdAt") {
                if (operation === "asc") {
                    const sortProduct = orders.sort((a, b) => b[value] - a[value])
                    e.target.classList = "display-off"
                    e.target.nextSibling.classList = "sort-button"
                    setProduct([...sortProduct])
                }
                if (operation === "desc") {
                    e.target.classList = "display-off"
                    e.target.previousSibling.classList = "sort-button"
                    const sortProduct = orders.sort((a, b) => a[value] - b[value])
                    setProduct([...sortProduct])
                }
            } else {
                if (operation === "asc") {
                    const sortProduct = orders.sort((a, b) => b[value].localeCompare(a[value]))
                    e.target.classList = "display-off"
                    e.target.nextSibling.classList = "sort-button"
                    setTags([...sortProduct])
                }
                if (operation === "desc") {
                    e.target.classList = "display-off"
                    e.target.previousSibling.classList = "sort-button"
                    const sortProduct = orders.sort((a, b) => a[value].localeCompare(b[value]))
                    setTags([...sortProduct])
                }
            }
        }
        if (type === 'tickets') {
            if (value === "fullName" || value === "email") {
                if (operation === "asc") {
                    const sortProduct = tickets.sort((a, b) => b[value].localeCompare(a[value]))
                    e.target.classList = "display-off"
                    e.target.nextSibling.classList = "sort-button"
                    setTags([...sortProduct])
                }
                if (operation === "desc") {
                    e.target.classList = "display-off"
                    e.target.previousSibling.classList = "sort-button"
                    const sortProduct = tickets.sort((a, b) => a[value].localeCompare(b[value]))
                    setTags([...sortProduct])
                }
            }
            if (value === "createdAt") {
                if (operation === "asc") {
                    const sortProduct = tickets.sort((a, b) => b[value] - a[value])
                    e.target.classList = "display-off"
                    e.target.nextSibling.classList = "sort-button"
                    setProduct([...sortProduct])
                }
                if (operation === "desc") {
                    e.target.classList = "display-off"
                    e.target.previousSibling.classList = "sort-button"
                    const sortProduct = tickets.sort((a, b) => a[value] - b[value])
                    setProduct([...sortProduct])
                }
            }
        }
    }
    return (
        <ProductContext.Provider value={{
            product, setProduct, users, editObj, isClosed, cartOrder, cartTotal, cartCount, isOpen, favList, handleReload, favStar, handleFavList, addToFavList, addToCart, handleChangeQuantity, removeListItem,
            handleCartClose, setEditObj, getProducts, postProduct, getUsers, postUser, deleteConfirm, editMockData, baseURL, url, tags, getTags, postTag, checkOut, totalProducts, totalUsers, totalTags, orders, totalOrders, getOrders, carouselItems, totalCarouselItems, getCarouselItems, postCarouselItem, sortTable, carouselActiveItems, setCarouselActiveItems, tickets, totalTickets, setTickets, setTotalTickets
        }}>
            {children}
        </ProductContext.Provider>
    )
}