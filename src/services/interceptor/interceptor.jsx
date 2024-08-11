import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useEffect } from "react";
import Swal from "sweetalert2";

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
})
const useApi = () => {
    const { token, logOut, user } = useUser()

    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(
            config => {
                if (token && user) {
                    config.headers.Authorization = token
                }
                return config
            })
        const responseInterceptor = api.interceptors.response.use(
            response => response,
            error => {
                console.log(error);
                // Mostrar un mensaje al usuario
                // Desloguearlo si el error en la respuesta fue un status 401
                if (error.response.status === 401) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Sesion vencida o invalida",
                        background: "#0E1014",
                        color: "#DCDEDF",
                        timer: 1500
                    }).then(() => {
                        logOut()
                    })
                }
                if (error.response.status === 404) {
                    Swal.fire({
                        icon: "error",
                        titleText: error.response.data.message,
                        background: "#0E1014",
                        color: "#DCDEDF",
                    })
                }
                if (error.response.status === 500) {
                    Swal.fire({
                        icon: "error",
                        titleText: error.response.data.message,
                        background: "#0E1014",
                        color: "#DCDEDF",
                    })
                }
            }
        )
        return () => {
            api.interceptors.request.eject(requestInterceptor)
            api.interceptors.response.eject(responseInterceptor)
        }
    }, [token])
    return api
}

export default useApi