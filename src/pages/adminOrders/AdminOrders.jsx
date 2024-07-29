import { useEffect, useState } from "react";
import useApi from "../../services/interceptor/interceptor";
import { useProduct } from "../../context/ProductContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function AdminOrders(){
    const [ orders, setOrders ] = useState([])
    const api = useApi()
    const { url, deleteConfirm } = useProduct()

    async function getOrders(){
        const response = await api.get(`${url}/orders`)
        console.log(response.data.orders)
        setOrders(response.data.orders)
    }
    useEffect(() => {
        getOrders()
    }, [])

    return(
        <>
            <div className="main-container">
                <div className="table-container">
                    <div className="table-title">
                        <h1>Administrador de Ordenes</h1>
                    </div>
                    <div className="table-container">
                        <table className="users-table">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Email</th>
                                <th>Productos</th>
                                <th>Fecha de compra</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map(order => {
                                    return(
                                        <tr key={order._id}>
                                            <td className="table-td">
                                                {order.user.userName}
                                            </td>
                                            <td className="table-td">
                                                {order.user.userEmail}
                                            </td>
                                            <td className="table-td">
                                            {
                                                        order.products.map(prod =>{
                                                            return(
                                                                <div  key={prod.product._id}>
                                                                    <span>{prod.product.productName}</span>
                                                                    <span>{prod.price}</span>
                                                                    <span>{prod.quantity}</span>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                            </td>
                                            <td className="table-td">{order.createdAt}</td>
                                            <td className="table-td actions">
                                                <button type="button" className="delete-button" onClick={() => deleteConfirm("order", order._id)}>
                                                    <FontAwesomeIcon className="product-button-icon" icon={faTrashCan} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}