import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserContext = createContext();
export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const url = import.meta.env.VITE_URL
    const navigate = useNavigate()
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem("user")) || {})
    const [ token, setToken ] = useState(JSON.parse(localStorage.getItem("token")))

    useEffect(() => {
        user ? localStorage.setItem("user", JSON.stringify(user)) : localStorage.removeItem("user", JSON.stringify(user))
        token ? localStorage.setItem("token", JSON.stringify(token)) : localStorage.removeItem("token", JSON.stringify(token))
    }, [user, token])

    async function logIn(data) {
        try {
            const response = await axios.post(`${url}/login`, data)
            console.log(response.data)
            setUser(response.data.user)
            setToken(response.data.token)
            console.log(user)
            Swal.fire({
                title: response.data.message,
                icon: "success",
                background: "#0E1014",
                color: "#DCDEDF"
            }).then(res =>{
                if(res.isConfirmed){
                    navigate("/")
                }
            })
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "No se pudo ingresar",
                text: "Verifique sus datos de ingreso",
                icon: "error",
                background: "#0E1014",
                color: "#DCDEDF"
            })
        }

    }
    function logOut(){
        setUser()
        setToken()
        navigate("/")
    }
    return (
        <UserContext.Provider value={{ url, user, token, logIn, logOut }}>
            {children}
        </UserContext.Provider>
    )
}
