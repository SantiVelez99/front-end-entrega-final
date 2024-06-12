import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useProduct } from '../../context/ProductContext'
import TagsCard from '../tagsCard/TagsCard'
import './tags-modal.css'
import { faFaceFrown } from '@fortawesome/free-regular-svg-icons'

export default function TagsModal({tag, producto}){
    const { product } = useProduct()
    const array = product.filter(prod => prod.productTags.includes(tag)).filter(prod => prod.id !== producto.id)
    if(array.length < 1){
        return(
            <div className="tags-gallery">
                <h1 className='tags-gallery-title'>No se encontraron mas juegos <FontAwesomeIcon icon={faFaceFrown} /></h1>
            </div>
        )
    }
    return(
            <div className="tags-gallery">
            <h1 className='tags-gallery-title'>Mas Juegos {tag}:</h1>
            {
                array.map((prod) =>{
                    return(
                        <>
                        <TagsCard producto={prod}/>
                        </>
                    )
                })
            }
            </div>
    )
}