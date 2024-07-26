import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useEffect } from "react";
import Swal from "sweetalert2";

const api = axios.create({
    baseURL: import.meta.env.VITE_URL
})

const useApi = () => {
    const { token, logOut } = useUser()
    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(
            config => {
                if(token) {
                    config.headers.Authorization = token
                }
                return config
            })
            const responseInterceptor = api.interceptors.response.use(
                response => response,
                error => {
                    if(error.response.status === 401){
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Sesion vencida o invalida",
                            timer: 1500
                        }).then(() => {
                            logOut()
                        })
                    }
                }
            )
            return() => {
                api.interceptors.request.eject(requestInterceptor)
                api.interceptors.response.eject(responseInterceptor)
            }
    }, [token])
    return api
}
export default useApi