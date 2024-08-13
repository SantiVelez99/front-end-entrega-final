import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useProduct } from '../../context/ProductContext'
import TagsCard from '../tagsCard/TagsCard'
import './tags-modal.css'
import { faFaceFrown } from '@fortawesome/free-regular-svg-icons'
import { useEffect, useState } from 'react'

export default function TagsModal({tag, producto}){
    const { product } = useProduct()
    const [array, setArray] = useState([])
    function filterProducts(tag){
        let arrayFilter = []
        product.forEach(prod => {
            prod.productTags.forEach(tagProd => {
                if(tagProd.viewValue === tag && prod._id !== producto._id) arrayFilter.push(prod)
            })
        })
        setArray(arrayFilter)
    }
    useEffect(() => {
        filterProducts(tag)
    }, [])

    if(array.length < 1){
        return(
            <div className="tags-gallery">
                <h1 className='tags-gallery-title'>No se encontraron mas juegos <FontAwesomeIcon icon={faFaceFrown} /></h1>
            </div>
        )
    } else {
        return(
                <div className="tags-gallery">
                <h1 className='tags-gallery-title'>Mas Juegos de {tag}:</h1>
                {
                    array.map(prod =>{
                        return(
                            <>
                                <TagsCard key={prod._id} producto={prod}/>
                            </>
                        )
                    })
                }
                </div>
        )
    }
}