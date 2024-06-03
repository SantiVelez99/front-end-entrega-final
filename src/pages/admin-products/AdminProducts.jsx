import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AdminProductForm from '../../components/adminProductForm/AdminProductForm'
import { useProduct } from '../../context/ProductContext'
import DateFormat from '../../utilities/dateFormat/DateFormat'
import './admin-product.css'
import Modal from '../../layout/modal/Modal'
import { useEffect, useState } from 'react'


export default function AdminProducts() {
    const { product, getProducts, deleteConfirm, editMockData, editObj } = useProduct()
    const [isOpen, setIsOpen] = useState(false)
    function handleModalOpen() {
        setIsOpen(true)
    }
    function handleModalClose() {
        setIsOpen(false)
    }
    useEffect(() => {
        getProducts()
    }, [])
    return (
        <main className='main-container' id='productsTableContainer'>
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
                                <th>Fecha de alta</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product.map(prod => {
                                    return (
                                        <tr key={prod.id}>
                                            <td className="product-img"><img src={prod.productImage}
                                                alt="elden ring portrait" /></td>
                                            <td className="product-name">{prod.productName}</td>
                                            <td className="product-description">
                                                <p>{prod.productDesc}</p>
                                            </td>
                                            <td className="product-entry-date">{DateFormat(prod.productDate)}</td>
                                            <td className="product-price">${prod.productPrice}</td>
                                            <td className="actions">
                                                <button type="button" className="edit-button" onClick={() => {
                                                    handleModalOpen(editMockData("producto", prod.id))

                                                }} >
                                                    <FontAwesomeIcon className="product-button-icon" icon={faPenToSquare} />
                                                </button>
                                                <button type="button" className="delete-button" onClick={() => deleteConfirm("producto", prod.id)}>
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
                <button className='add-product-btn' onClick={handleModalOpen}>Crear producto</button>
                <Modal isOpen={isOpen} handleModalClose={handleModalClose}>
                    <AdminProductForm handleModalClose={handleModalClose} editObj={editObj} isOpen={isOpen} />
                </Modal>
            </div>
        </main>
    )
}