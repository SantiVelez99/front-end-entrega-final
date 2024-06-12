import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { useProduct } from '../../context/ProductContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './admin-users.css'
import DateFormat from '../../utilities/dateFormat/DateFormat'
import { useEffect, useState } from 'react'
import Modal from '../../layout/modal/Modal'
import Register from '../register/Register'

export default function AdminUsers() {

    const { user, getUsers, deleteConfirm, editMockData, editObj } = useProduct()
    const [isOpen, setIsOpen] = useState(false)
    function handleModalOpen() {
        setIsOpen(true)
    }
    function handleModalClose() {
        setIsOpen(false)
    }
    useEffect(() => {
        getUsers()
    }, [])
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
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Fecha de nacimiento</th>
                                <th>Nacionalidad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.map(us => {
                                    return (
                                        <tr key={us.id}>
                                            <td className="table-td"><img className='user-avatar' src={us.userAvatar? us.userAvatar : "https://i.ibb.co/n1MfMnZ/user-profile-default.png"}
                                                alt="user portrait" /></td>
                                            <td className="table-td">{us.userName}</td>
                                            <td className="table-td">{us.userEmail}</td>
                                            <td className="table-td">{DateFormat(us.userBorndate)}</td>
                                            <td className="table-td">{us.userCountry}</td>
                                            <td className="table-td actions">
                                                <button type="button" className="edit-button" onClick={() => handleModalOpen(editMockData("usuario", us.id))} >
                                                    <FontAwesomeIcon className="product-button-icon" icon={faPenToSquare} />
                                                </button>
                                                <button type="button" className="delete-button" onClick={() => deleteConfirm("usuario", us.id)}>
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
        </main>
    )
}