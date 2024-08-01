import { useState } from 'react'
import './pagination.css'
export default function Pagination({ totalItem, loadPage, pageItems }){

    const [page, setPage] = useState(0)
    const totalBtns = Math.ceil(totalItem / pageItems)


    function handlePageChange(value){
        setPage(value)
        loadPage({page: value})
    }
    function renderButtons(){
        const btns = [];

        for(let i = 0; i < totalBtns; i++){
            btns.push(
                <button key={i} className={`pagination-item ${page === i ? 'active' : ''}`}
                                onClick={() => handlePageChange(i)}
                >{i+1}
                    </button>
            )
        }
        return btns
    }

    return(
        <div className="pagination-list">
            {renderButtons()}
        </div>
    )

}