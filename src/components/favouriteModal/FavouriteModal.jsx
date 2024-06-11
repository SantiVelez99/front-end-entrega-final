import './favourite-modal.css'
import { useProduct } from '../../context/ProductContext'
import FavouriteCard from '../favouriteCard/FavouriteCard'

export default function FavouriteModal() {
    const { favList } = useProduct()
    if(favList < 1){
        return(
            <>
            <div className="fav-list-container">
            <h1 className='fav-list-title'>Lista de Favoritos:</h1>
            <h1 className='fav-list-empty'>No hay nada aun...</h1>
            </div>
            </>
        )
    }
    if(favList.length >= 1){
        return (
            <>
                <div className='fav-list-container'>
                    <h1 className='fav-list-title'>Lista de Favoritos:</h1>
                    <ul>
                        {
                            favList.map(prod => {
                                return (
                                    <li key={prod.id}>
                                        <FavouriteCard producto={prod} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </>
        )
    }
}