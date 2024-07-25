import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AdminProductForm from '../../components/adminProductForm/AdminProductForm'
import { useProduct } from '../../context/ProductContext'
import DateFormat from '../../utilities/dateFormat/DateFormat'
import './admin-product.css'
import Modal from '../../layout/modal/Modal'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import AdminTags from '../../components/adminTags/AdminTags'


export default function AdminProducts() {
    const { product, getProducts, deleteConfirm, editMockData, editObj, setEditObj } = useProduct()
    const [isOpen, setIsOpen] = useState(false)
    const { baseURL } = useProduct()
    function handleModalOpen() {
        setIsOpen(true)
    }
    function handleModalClose() {
        setIsOpen(false)
        setEditObj([""])
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
                                        <tr key={prod._id}>
                                            <td className="product-img"><img src={`${baseURL}/images/products/card-images/${prod.productImage?.id}`}
                                                alt={prod.productImage?.name} /></td>
                                            <td className="product-name"><NavLink className="table-link" title='Al product-detail' to={`/product-detail/${prod._id}`}>{prod.productName}</NavLink></td>
                                            <td className="product-description">
                                                <p>{prod.productDesc}</p>
                                            </td>
                                            <td className="product-entry-date">{DateFormat(prod.productDate)}</td>
                                            <td className="product-price">${prod.productPrice}</td>
                                            <td className="actions">
                                                <button type="button" className="edit-button" onClick={() => {
                                                    handleModalOpen(editMockData("producto", prod._id))

                                                }} >
                                                    <FontAwesomeIcon className="product-button-icon" icon={faPenToSquare} />
                                                </button>
                                                <button type="button" className="delete-button" onClick={() => deleteConfirm("producto", prod._id)}>
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
            <AdminTags/>
        </main>
    )
}