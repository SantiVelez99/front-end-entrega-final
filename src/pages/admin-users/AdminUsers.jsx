import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import handleEdit from '../../utilities/handleEdit/HandleEdit'
import handleDelete from '../../utilities/handleDelete/HandleDelete'
import { useProduct } from '../../context/ProductContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './admin-users.css'

export default function AdminUsers(){

    const { user } = useProduct()

    return(
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
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.map(us => {
                                    return (
                                        <tr key={us.id}>
                                            <td className="table-td"><img className='user-avatar' src={us.userAvatar}
                                                alt="user portrait" /></td>
                                            <td className="table-td">{us.userName} {us.userSurname}</td>
                                            <td className="table-td">{us.email}</td>
                                            <td className="table-td">{us.bornDate}</td>
                                            <td className="table-td">{us.country}</td>
                                            <td className="table-td">{us.userRole}</td>
                                            <td className="table-td actions">
                                                <button type="button" className="edit-button" onClick={() => handleEdit(us.id)} >
                                                    <FontAwesomeIcon className="product-button-icon" icon={faPenToSquare}/>
                                                </button>
                                                <button type="button" className="delete-button" onClick={() => handleDelete(us.id)}>
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