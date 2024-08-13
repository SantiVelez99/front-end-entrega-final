import { faCaretLeft, faCaretRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import './pagination.css'
import useApi from "../../services/interceptor/interceptor";

export default function Pagination({ getItems, totalItems, type }) {

    const [itemsPerPage, setItemsPerPage] = useState(6)
    const pageCount = Math.ceil(totalItems / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(0)
    const api = useApi()

    useEffect(() => {
        getItems({ page: currentPage, limit: itemsPerPage })
    }, [currentPage, pageCount])
    useEffect(() => {
        setCurrentPage(0)
    }, [itemsPerPage])
    const changePage = ({ selected }) => {
        setCurrentPage(selected);
    }
    function nameSearch(e) {
        e.preventDefault()
        if(type === "tag"){
            const input = document.getElementById("tagInput")
                getItems({name: input.value})
        } else {
            const input = document.getElementById("name")
                if(input.value.includes("@")) {
                    getItems({ email: input.value })
                } else {
                    getItems({ name: input.value })
                }
            }
    }
    return (
        <div className="gallery-pagination">
            <ReactPaginate
                previousLabel={<FontAwesomeIcon icon={faCaretLeft} />}
                nextLabel={<FontAwesomeIcon icon={faCaretRight} />}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName="ul-gallery"
                activeClassName="active"
            />

            <div className="select-container">
                <label htmlFor="prodPerPage">Items por pagina: </label>
                <select name="prodPerPage" id="prodPerPage" defaultValue={6} onChange={(e) => setItemsPerPage(e.target.value)}>
                    <option value={1}>1</option>
                    <option value={3}>3</option>
                    <option value={6}>6</option>
                    <option value={9}>9</option>
                    <option value={12}>12</option>
                </select>
            </div>
            <div className={type === "myOrders" ? "display-off" : "search-form"}>
                <form onSubmit={(e) => nameSearch(e)}>
                    <label htmlFor="name"></label>
                    <input type="text" name="name" id={type === "tag"? "tagInput" : "name"} className="search-input" autoFocus />
                    <button type="submit" htmlFor="name" className="search-button"><FontAwesomeIcon className="icon" icon={faMagnifyingGlass} /></button>
                </form>
            </div>
        </div>
    )


}