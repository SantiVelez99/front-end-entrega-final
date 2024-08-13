import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { useProduct } from '../../context/ProductContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './admin-users.css'
import DateFormat from '../../utilities/dateFormat/DateFormat'
import { useState } from 'react'
import Modal from '../../layout/modal/Modal'
import Register from '../register/Register'
import Pagination from '../../components/pagination/Pagination'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

export default function AdminUsers() {

    const { users, getUsers, deleteConfirm, editMockData, editObj, baseURL, totalUsers, sortTable } = useProduct()
    const [isOpen, setIsOpen] = useState(false)
    function handleModalOpen() {
        setIsOpen(true)
    }
    function handleModalClose() {
        setIsOpen(false)
    }
    return (
        <main className="main-container">
            <div className="table-container">
                <div className="table-title">
                    <h1>Administrador de Usuarios</h1>
                </div>
                <div className="table-container">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre
                                <button type='button' className='sort-button' onClick={(e) => sortTable("userName", "asc", e, "users")}><FontAwesomeIcon className='icon' icon={faChevronDown} /></button>
                                <button type='button' className='display-off' onClick={(e) => sortTable("userName", "desc", e, "users")}><FontAwesomeIcon className='icon' icon={faChevronUp} /></button>
                                </th>
                                <th>Email
                                <button type='button' className='sort-button' onClick={(e) => sortTable("userEmail", "asc", e, "users")}><FontAwesomeIcon className='icon' icon={faChevronDown} /></button>
                                <button type='button' className='display-off' onClick={(e) => sortTable("userEmail", "desc", e, "users")}><FontAwesomeIcon className='icon' icon={faChevronUp} /></button>
                                </th>
                                <th>Fecha de nacimiento</th>
                                <th>Nacionalidad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(us => {
                                    return (
                                        <tr key={us._id}>
                                            <td className="table-td"><img className='user-avatar' src={`${baseURL}/images/users/user-avatar/${us.userAvatar.id}`}
                                                alt="user portrait" /></td>
                                            <td className="table-td">{us.userName}</td>
                                            <td className="table-td">{us.userEmail}</td>
                                            <td className="table-td">{us.userBorndate? DateFormat(us.userBorndate) : undefined}</td>
                                            <td className="table-td">{us.userCountry}</td>
                                            <td className="table-td actions">
                                                <button type="button" className="edit-button" onClick={() => handleModalOpen(editMockData("usuario", us._id))} >
                                                    <FontAwesomeIcon className="product-button-icon" icon={faPenToSquare} />
                                                </button>
                                                <button type="button" className="delete-button" onClick={() => deleteConfirm("usuario", us._id)}>
                                                    <FontAwesomeIcon className="product-button-icon" icon={faTrashCan} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <button className='add-product-btn' onClick={handleModalOpen}>Crear Usuario</button>
                </div>
                <Modal isOpen={isOpen} handleModalClose={handleModalClose}>
                    <Register handleModalClose={handleModalClose} editObj={editObj} isOpen={isOpen} />
                </Modal>
            </div>
            <Pagination getItems={getUsers} totalItems={totalUsers}/>
        </main>
    )
}