import axios from "axios";
import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";

const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext)



export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState([]);
    const [user, setUser] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const mockURL = "https://6622ed463e17a3ac846e4065.mockapi.io/api"


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
        try {
            await axios.post(`${mockURL}/product`, obj)
            getProducts()
            postCorrect()
        } catch (error) {
            console.log(error)
        }
    }
    async function deleteMockData(string, id) {
        if(string === "producto"){
            try {
                await axios.delete(`${mockURL}/product/${id}`)
                deleteSuccess(string)
                getProducts()
            } catch (error) {
                console.log(error)
            }
        }
        if(string === "usuario"){
            try {
                await axios.delete(`${mockURL}/user/${id}`)
                deleteSuccess(string)
                getUsers()
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
    async function postUser(obj){
        try {
            await axios.post(`${mockURL}/user`, obj)
            console.log(obj)
            getUsers()
        } catch (error) {
            console.log(error)
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
        }).then((res) => {
            if (res.isConfirmed) {
                handleModalClose()
            }
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
            title: `El ${string} borrado correctamente`,
            background: "#0E1014",
            color: "#DCDEDF",
            confirmButtonText: "Confirmar"
        })
    }
    // !FIN SWAL

    function handleModalClose() {
        setIsOpen(false)
    }

    function handleModalOpen() {
        setIsOpen(true)
    }

    return (
        <ProductContext.Provider value={{ product, user, isOpen, getProducts, postProduct, getUsers, postUser, handleModalClose, handleModalOpen, deleteConfirm }}>
            {children}
        </ProductContext.Provider>
    )
}