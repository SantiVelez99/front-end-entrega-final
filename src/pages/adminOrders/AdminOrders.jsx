import { useProduct } from "../../context/ProductContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faCaretUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import DateFormat from "../../utilities/dateFormat/DateFormat";
import Pagination from "../../components/pagination/Pagination";

export default function AdminOrders() {
    const { deleteConfirm, getOrders, totalOrders, orders } = useProduct()
    function showOrder(e) {
        e.target.classList = "display-off"
        e.target.parentElement.children[1].classList = "close-order-icon"
        e.target.parentElement.children[2].classList = "table-order"
    }
    function hideOrder(e) {
        e.target.classList = "display-off"
        e.target.parentElement.children[0].classList = "open-order-icon"
        e.target.parentElement.children[2].classList = "display-off"
    }
    return (
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
                                    <th>Orden</th>
                                    <th>Total</th>
                                    <th>Fecha de compra</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map(order => {
                                        return (
                                            <tr key={order._id}>
                                                <td className="table-td">
                                                    {order.user.userName}
                                                </td>
                                                <td className="table-td">
                                                    {order.user.userEmail}
                                                </td>
                                                <td className="table-td">
                                                    <div className="open-order-icon" onClick={(e) => showOrder(e)} title="Mostrar Orden">
                                                        <FontAwesomeIcon className="order-icon" icon={faSortDown} />
                                                    </div>
                                                    <div className="close-order-icon display-off" onClick={(e) => hideOrder(e)} title="Ocultar Orden">
                                                        <FontAwesomeIcon className="order-icon" icon={faCaretUp} />
                                                    </div>
                                                    <table className="table-order display-off">
                                                        <thead>
                                                            <tr>
                                                                <th>Nombre</th>
                                                                <th>Precio</th>
                                                                <th>Cantidad</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                order.products.map(prod => {
                                                                    return (
                                                                        <tr key={prod.product._id}>
                                                                            <td>
                                                                                {prod.product.productName}
                                                                            </td>
                                                                            <td>
                                                                                $ {prod.price}
                                                                            </td>
                                                                            <td>
                                                                                {prod.quantity}u
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td className="table-td">$ {order.total}</td>
                                                <td className="table-td">{DateFormat(order.createdAt)}</td>
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
                    <Pagination getItems={getOrders} totalItems={totalOrders}/>
                </div>
            </div>
        </>
    )
}