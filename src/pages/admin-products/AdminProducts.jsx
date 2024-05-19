import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import './admin-product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AdminProductForm from '../../components/adminProductForm/AdminProductForm'
import { useProduct } from '../../context/ProductContext'

export default function AdminProducts() {
    function handleEdit(id) {
        console.log(id)
    }
    function handleDelete(id) {
        console.log(id)
    }
    const { product } = useProduct()
    return (
        <main className='main-container' id='productsTableContainer'>
            <AdminProductForm />
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
                            {
                                product.map(prod => {
                                    return (
                                        <tr key={prod.id}>
                                            <td className="product-img"><img src="/assets/images/portraits/elden.jpeg"
                                                alt="elden ring portrait" /></td>
                                            <td className="product-name">{prod.productName}</td>
                                            <td className="product-description">
                                                <p>{prod.productDesc}</p>
                                            </td>
                                            <td className="product-entry-date">{prod.productDate}</td>
                                            <td className="product-price">${prod.productPrice}</td>
                                            <td className="product-actions">
                                                <button type="button" className="edit-button" onClick={() => handleEdit(prod.id)} >
                                                    <FontAwesomeIcon className="product-button-icon" icon={faPenToSquare}/>
                                                </button>
                                                <button type="button" className="delete-button" onClick={() => handleDelete(prod.id)}>
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
        </main>
    )
}