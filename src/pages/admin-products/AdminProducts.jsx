import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import './admin-product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export default function AdminProducts() {
    return (
        <main className="main-container" id='productsTableContainer'>
            <div className="table-container">
                <div className="table-title">
                    <h1>Administrador de Productos</h1>
                </div>
                <div className="table-container">
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Fecha de ingreso</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                            <tbody>
                                <tr>
                                    <td className="product-img"><img src="/assets/images/portraits/elden.jpeg"
                                        alt="elden ring portrait" /></td>
                                    <td className="product-name">ELDEN RING</td>
                                    <td className="product-description">
                                        <p>
                                            EL NUEVO JUEGO DE ROL Y ACCIÓN DE AMBIENTACIÓN FANTÁSTICA.
                                            Álzate,
                                            Sinluz, y que
                                            la gracia te guíe para abrazar el poder del Círculo de Elden y encumbrarte como
                                            señor
                                            del
                                            Círculo en
                                            las Tierras Intermedias.
                                        </p>
                                    </td>
                                    <td className="product-entry-date">24 FEB 2022</td>
                                    <td className="product-price">$47.99</td>
                                    <td className="product-actions">
                                        <button type="button" className="edit-button">
                                            <FontAwesomeIcon className="product-button-icon" icon={faPenToSquare} />
                                        </button>
                                        <button type="button" className="delete-button">
                                            <FontAwesomeIcon className="product-button-icon" icon={faTrashCan} />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}