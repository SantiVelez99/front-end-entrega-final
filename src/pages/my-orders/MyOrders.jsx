import { useEffect, useState } from "react";
import { useProduct } from "../../context/ProductContext";
import { useUser } from "../../context/UserContext";
import useApi from "../../services/interceptor/interceptor";
import './my-orders.css'
import DateFormat from "../../utilities/dateFormat/DateFormat";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../components/pagination/Pagination";

export default function MyOrders() {

    const { user } = useUser()
    const { url, baseURL, addToCart } = useProduct()
    const api = useApi()
    const [orders, setOrders] = useState([])
    const [ total, setTotal ] = useState(0)
    async function getOrdersByUserID({ page = 0, limit = 100 }) {
        const id = user._id
        const response = await api.get(`${url}/orders/${id}?page=${page}&limit=${limit}`)
        setOrders(response.data.orders)
        setTotal(response.data.total)
        console.log(response.data)
    }
    useEffect(() => {
        getOrdersByUserID({})
        console.log(orders)
    }, [])

    if(orders.length === 0 ) return(
        <>
        <div className="main-container">
            <div className="my-orders">
                <h1 className="order-title">Aun no has realizado ninguna compra</h1>
            </div>
        </div>
        </>
    )
    if(orders.length > 0) return (
        <div className="main-container">
            <h1>Mis Ordenes</h1>
            <div className="my-orders">
                {
                    orders.map(order => {
                        return (
                            <div key={order._id} className="my-order-container">
                                <div className="my-order-item">{DateFormat(order.createdAt)}</div>
                                <div className="my-order-item">
                                        {
                                            order.products.map(prod => {
                                                return (
                                                    <div key={prod._id}className="my-order-product">
                                                        <div className="my-order-image">
                                                            <img src={`${baseURL}/images/products/card-images/${prod.product.productImage.id}`} alt="" />
                                                        </div>
                                                        <div className="my-order-name">
                                                            <NavLink to={`/product-detail/${prod.product._id}`}>{prod.product.productName}</NavLink>
                                                        </div>
                                                        <div className="my-order-details">
                                                            $ {prod.price}
                                                        </div>
                                                        <div className="my-order-details">
                                                            {prod.quantity}u
                                                        </div>
                                                        <button className="my-order-button" onClick={() => addToCart(prod.product)} title="Volver a comprar"><FontAwesomeIcon icon={faCartShopping} /></button>
                                                    </div>
                                                )
                                            })
                                        }
                                </div>
                                <div className="my-order-item">Total: $ {order.total}</div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="my-orders-pagination">
                <Pagination getItems={getOrdersByUserID} totalItems={total} type={"myOrders"}/>
            </div>
        </div>
    )
}