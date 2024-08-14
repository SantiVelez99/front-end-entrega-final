import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useProduct } from "../../context/ProductContext"
import Swal from "sweetalert2"

export default function AdminCarouselForm({ handleModalClose, editObj }) {

    const { handleSubmit, register, reset, setValue, formState: { errors } } = useForm()
    const { product, getProducts, postCarouselItem, carouselItems, getCarouselItems } = useProduct()
    useEffect(() => {
        getCarouselItems({})
        getProducts({})
    }, [])

    function checkItems(id){
        carouselItems.forEach(item => {
            if(item.product === id) {
                throw new Error(
                    Swal.fire({
                       icon: "error",
                       title: "No puede crear 2 items para el mismo producto.",
                       background: "#0E1014",
                       color: "#DCDEDF"
                   })
                );
            }
        })
    }
    const onSubmit = data => {
        if(!data._id){
            checkItems(data.product)
        }
        const formData = new FormData()
        formData.append("id", data._id)
        formData.append("title", data.title)
        formData.append("description", data.description)
        formData.append("carouselImage", data.carouselImage.length ? data.carouselImage[0] : false)
        formData.append("product", data.product)
        try {
            postCarouselItem(formData)
            reset()
            handleModalClose()
        } catch (error) {
            console.log(error)
        }
    }
    async function setFormValues(editObj) {
        if(Object.keys(editObj).length > 0) {
            const keys = Object.keys(editObj)
            const values = Object.values(editObj)
            keys.forEach((key, i) => {
                setValue(key, values[i])
            })
        }
    }
    useEffect(() => {
        setFormValues(editObj)
    }, [editObj])

    return (
        <>
            <div className={editObj._id ? "form-product-container edit-background" : "form-product-container"}>
                <div className="table-title mb-16">
                    <h1>{editObj._id ? "Editar Item" : "Crear Item"}</h1>
                </div>
                <form className="section visible" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-container">
                        <input type="text" className="display-off" {...register('id')} />
                        <label htmlFor="title" className="input-title">Título:</label>
                        <input name="title" type="text" className="form-input" autoFocus={true} {...register("title", { required: editObj._id ? false : true, minLength: 3, maxLength: 60 })} />
                        {errors.title?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.title?.type === "minLength" || errors.title?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <input type="text" className="display-off" {...register('id')} />
                        <label htmlFor="description" className="input-title">Descripción:</label>
                        <textarea name="description" className="form-textarea" {...register("description", { required: editObj._id ? false : true, minLength: 3, maxLength: 300 })} />
                        {errors.description?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.description?.type === "minLength" || errors.description?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title" htmlFor="carouselImage">Imagen: </label>
                        <input name="carouselImage" type="file" accept='image/*' className="form-input" {...register("carouselImage", { required: editObj._id ? false : true })} />
                        {errors.carouselImage?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                    </div>
                    <div className="input-container">
                        <label htmlFor="product" className="input-title">Producto Asociado: </label>
                        <select name="product" id="product" className="input-select" {...register("product", { required: true })}>
                            <option value="">Productos...</option>
                            {
                                product?.map(prod => {
                                    return (
                                        <option key={prod._id} value={prod._id}>{prod.productName}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <button className='form-btn' type='submit'>{editObj._id ? "Editar" : "Crear"}</button>
                </form>
            </div>
        </>
    )
}