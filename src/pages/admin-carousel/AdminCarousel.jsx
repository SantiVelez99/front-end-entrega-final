import { useState } from 'react'
import { useProduct } from '../../context/ProductContext'
import Modal from '../../layout/modal/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import AdminCarouselForm from '../../components/adminCarouselForm/AdminCarouselForm'
import Pagination from '../../components/pagination/Pagination'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

export default function AdminCarousel() {

    const { setEditObj, editObj, getCarouselItems, carouselItems, totalCarouselItems, baseURL, editMockData, deleteConfirm, sortTable } = useProduct()
    const [ isOpen, setIsOpen ] = useState(false)

    function handleModalOpen() {
        setIsOpen(true)
    }
    function handleModalClose() {
        setIsOpen(false)
        setEditObj([""])
    }
    return (
        <>
            <div className='main-container'>
                <div className='table-container'>
                    <div className='table-title'>
                        <h1>Admin Carousel items</h1>
                    </div>
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Titulo
                                <button type='button' className='sort-button' onClick={(e) => sortTable("title", "asc", e, "carousel")}><FontAwesomeIcon className='icon' icon={faChevronDown} /></button>
                                <button type='button' className='display-off' onClick={(e) => sortTable("title", "desc", e, "carousel")}><FontAwesomeIcon className='icon' icon={faChevronUp} /></button>
                                </th>
                                <th>Descripcion</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                carouselItems.map(item => {
                                    return(
                                        <tr key={item._id}>
                                            <td className='product-img'>
                                                <img src={`${baseURL}/images/carouselItems/${item.carouselImage.id}`} alt={item.title} />
                                            </td>
                                            <td className='product-name'>
                                                {item.title}
                                            </td>
                                            <td>{item.description}</td>
                                            <td className="actions">
                                                <button type="button" className="edit-button" onClick={() => {
                                                    handleModalOpen(editMockData("carousel", item._id))
                                                }} >
                                                    <FontAwesomeIcon className="product-button-icon" icon={faPenToSquare} />
                                                </button>
                                                <button type="button" className="delete-button" onClick={() => deleteConfirm("carousel", item._id)}>
                                                    <FontAwesomeIcon className="product-button-icon" icon={faTrashCan} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                <button className='add-product-btn' onClick={handleModalOpen}>Crear Item</button>
                </div>
                <Modal isOpen={isOpen} handleModalClose={handleModalClose}>
                            <AdminCarouselForm editObj={editObj} handleModalClose={handleModalClose}/>
                </Modal>
                <Pagination getItems={getCarouselItems} totalItems={totalCarouselItems}/>
            </div>
        </>
    )
}