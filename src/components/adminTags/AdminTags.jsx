import { useEffect, useState } from "react"
import { useProduct } from "../../context/ProductContext"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Modal from "../../layout/modal/Modal"
import AdminTagsForm from "./AdminTagsForm"
import Pagination from "../pagination/Pagination"

export default function AdminTags(){
    
    const { tags, getTags, editMockData, deleteConfirm, editObj, setEditObj, totalTags } = useProduct()
    const [isOpen, setIsOpen] = useState(false)
    function handleModalOpen() {
        setIsOpen(true)
    }
    function handleModalClose() {
        setIsOpen(false)
        setEditObj([])
    }
    console.log(tags)
    return(
        <>
            <div className="table-container">
                <div className="table-title">
                <h1>Administrador de categorias</h1>
                </div>
                <div className="table-container">
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Vista al usuario</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                            <tbody>
                                {
                                    tags?.map(tag => {
                                        return(
                                            <tr key={tag._id}>
                                                <td>{tag.name}</td>
                                                <td>{tag.viewValue}</td>
                                                <td className="actions">
                                                <button type="button" className="edit-button" onClick={() => {
                                                    handleModalOpen(editMockData("tag", tag._id))

                                                }} >
                                                    <FontAwesomeIcon className="product-button-icon" icon={faPenToSquare} />
                                                </button>
                                                <button type="button" className="delete-button" onClick={() => deleteConfirm("tag", tag._id)}>
                                                    <FontAwesomeIcon className="product-button-icon" icon={faTrashCan} />
                                                </button>
                                            </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                    </table>
                    <button className="add-product-btn" onClick={handleModalOpen}>Crear Categoria</button>
                </div>
                <Modal isOpen={isOpen} handleModalClose={handleModalClose}>
                        <AdminTagsForm handleModalClose={handleModalClose} editObj={editObj} isOpen={isOpen} />
                </Modal>
            <Pagination getItems={getTags} totalItems={totalTags} type="tag"/>
            </div>
        </>
    )
}