import { useEffect, useState } from "react"
import { useProduct } from "../../context/ProductContext"
import useApi from "../../services/interceptor/interceptor"
import Modal from "../../layout/modal/Modal"
import './adminTicket.css'
import Pagination from "../../components/pagination/Pagination"
import DateFormat from "../../utilities/dateFormat/DateFormat"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"

export default function AdminTicket() {
    const [ticket, setTicket] = useState()
    const { url, baseURL, sortTable, tickets, totalTickets, setTickets, setTotalTickets } = useProduct()
    const api = useApi()
    const [isOpen, setIsOpen] = useState(false)

    function handleModalClose(isOpen) {
        if (isOpen) setIsOpen(false)
        if (!isOpen) setIsOpen(true)
    }

    async function getTickets({ page = 0, limit = 100, name, email }) {
        const nameQuery = name? `&name=${name}`: ''
        const emailQuery = email? `&email=${email}` : ''
        const response = await api.get(`${url}/contact?page=${page}&limit=${limit}${nameQuery}${emailQuery}`)
            setTickets(response.data.tickets)
            setTotalTickets(response.data.total)
    }
    useEffect(() => {
        getTickets({})
    }, [])

    async function getTicketByID(id) {
        try {
            const response = await api.get(`${url}/contact/ticket/${id}`)
            console.log(response.data.ticket)
            setTicket(response.data.ticket)
            handleModalClose(isOpen)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="main-container">
                <div className="table-container">
                    <div className="table-title">
                        <h1>Administrador de tickets</h1>
                    </div>
                </div>
                <div className="table-container">
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>
                                    Nombre
                                <button type='button' className='sort-button' onClick={(e) => sortTable("fullName", "asc", e, "tickets")}><FontAwesomeIcon className='icon' icon={faChevronDown} /></button>
                                <button type='button' className='display-off' onClick={(e) => sortTable("fullName", "desc", e, "tickets")}><FontAwesomeIcon className='icon' icon={faChevronUp} /></button>
                                </th>
                                <th>
                                    Email
                                <button type='button' className='sort-button' onClick={(e) => sortTable("fullName", "asc", e, "tickets")}><FontAwesomeIcon className='icon' icon={faChevronDown} /></button>
                                <button type='button' className='display-off' onClick={(e) => sortTable("fullName", "desc", e, "tickets")}><FontAwesomeIcon className='icon' icon={faChevronUp} /></button>
                                </th>
                                <th>Mensaje</th>
                                <th>
                                    Fecha
                                <button type='button' className='sort-button' onClick={(e) => sortTable("fullName", "asc", e, "tickets")}><FontAwesomeIcon className='icon' icon={faChevronDown} /></button>
                                <button type='button' className='display-off' onClick={(e) => sortTable("fullName", "desc", e, "tickets")}><FontAwesomeIcon className='icon' icon={faChevronUp} /></button>
                                </th>
                                <th>Imagenes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tickets?.map(ticket => {
                                    return (<tr key={ticket._id}>
                                        <td>
                                            {ticket.fullName} 
                                        </td>
                                        <td>
                                            {ticket.email}
                                        </td>
                                        <td>
                                            {ticket.message}
                                        </td>
                                        <td>{DateFormat(ticket.createdAt)}</td>
                                        <td>
                                            {
                                                ticket.contactImages.length > 0 ? <button onClick={() => getTicketByID(ticket._id)}>Ver Imagenes</button> : "No hay Imagenes"
                                            }
                                        </td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <Modal isOpen={isOpen} handleModalClose={handleModalClose}>
                    <>
                        <div className="admin-ticket-container">
                            {
                                ticket?.contactImages.map((image, i) => {
                                    return (<div key={i} className="admin-ticket-image-container">
                                        <img className="admin-ticket-image" src={`${baseURL}/images/contact/${image.id}`} alt={image.name} />
                                    </div>
                                    )
                                })
                            }
                        </div>
                    </>
                </Modal>
                <Pagination getItems={getTickets} totalItems={totalTickets}/>
            </div>
        </>
    )
}