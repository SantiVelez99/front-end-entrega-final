import { useEffect, useState } from "react"
import { useProduct } from "../../context/ProductContext"
import { useUser } from "../../context/UserContext"
import useApi from "../../services/interceptor/interceptor"
import DateFormat from "../../utilities/dateFormat/DateFormat"
import Modal from "../../layout/modal/Modal"
import './myTickets.css'
import Pagination from "../../components/pagination/Pagination"

export default function MyTickets() {

    const { url, baseURL } = useProduct()
    const { user } = useUser()
    const api = useApi()
    const [tickets, setTickets] = useState([])
    const [ ticket, setTicket ] = useState()
    const [totalTickets, setTotalTickets] = useState(0)
    const [ isOpen, setIsOpen ] = useState(false)

    async function getTicketsByUserId({page = 0, limit = 100}) {
        try {
            const response = await api.get(`${url}/contact/${user._id}?page=${page}&limit=${limit}`)
            setTickets(response.data.tickets)
            setTotalTickets(response.data.total)
        } catch (error) {
            console.log(error)
        }
    }

    async function getTicketByID(id) {
        try {
            const response = await api.get(`${url}/contact/ticket/${id}`)   
            setTicket(response.data.ticket)
            handleModalClose(isOpen)
        } catch (error) {
            console.log(error)
        }
    }
    function handleModalClose(isOpen) {
        if (isOpen) setIsOpen(false)
        if (!isOpen) setIsOpen(true)
    }
    useEffect(() => {
        getTicketsByUserId({})
    }, [])

    if (tickets.length === 0) {
        return (
            <>
                <div className="main-container">
                    <div className="my-orders">
                        <h1 className="order-title">Aun no has realizado ninguna consulta</h1>
                    </div>
                </div>
            </>
        )
    }

    if (tickets.length > 0) {
        return (
            <div className="main-container">
                <h1 className="order-title">Mis Consultas</h1>
                <div className="my-orders">
                {
                    tickets.map(ticket => {
                        return(
                        <div key={ticket._id} className="my-order-container">
                            <div className="my-order-item">{DateFormat(ticket.contactDate)}</div>
                            <div className="my-order-item my-tickets-item">{ticket.message}</div>
                            <div className="my-order-item my-tickets-item">
                                {ticket.contactImages.length > 0 ? <button onClick={() => getTicketByID(ticket._id)}>Ver Imagenes</button> : "No hay Imagenes"}
                            </div>
                        </div>
                        )
                    })
                }
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
                <Pagination getItems={getTicketsByUserId} totalItems={totalTickets} type={"myOrders"}/>
            </div>
        )
    }
}