import { useProduct } from '../../context/ProductContext';
import './admin-product-form.css'
import { useForm } from 'react-hook-form';
export default function AdminProductForm() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { postProduct } = useProduct()
    const onSubmit = data => {
        data.id = crypto.randomUUID()
        data.productPrice = +data.productPrice
        data.productDate = new Date(data.productDate).getTime()
        postProduct(data)
    }

    return (
        <div className="form-product-container">
            <div className="table-title mb-16">
                <h1>Formulario de alta de productos</h1>
            </div>
            <form className="admin-product-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="input-container">
                    <label className="input-title">Nombre del producto:</label>
                    <input type="text" className="form-input" autoFocus={true} {...register("productName", { required: true, minLength: 3, maxLength: 60 })} />
                    {errors.productName?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                    {(errors.productName?.type === "minLength" || errors.productName?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                </div>
                <div className="input-container">
                    <label className="input-title">Fecha de ingreso:</label>
                    <input type="date" className="form-input" {...register("productDate", { required: true })} />
                    {errors.productDate?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                </div>
                <div className="input-container">
                    <label className="input-title">Precio:</label>
                    <input type="number" className="form-input" step={.01} {...register("productPrice", { required: true, min: 0 })} />
                    {errors.productPrice?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                </div>
                <div className="input-container">
                    <label className="input-title">Descripcion:</label>
                    <textarea className='form-textarea' {...register("productDesc", { required: true, cols: 30, rows: 5, minLength: 3, maxLength: 600 })}></textarea>
                    {errors.productDesc?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                    {(errors.productDesc?.type === "minLength" || errors.productDesc?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                </div>
                <div className="input-container">
                    <label className="input-title">Imagen:</label>
                    <input type="url" className="form-input" {...register("productImage", { required: true, minLength: 3, maxLength: 200 })} />
                    {errors.productImage?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                    {(errors.productImage?.type === "minLength" || errors.productImage?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                </div>
                <button className='form-btn' type='submit'>Enviar</button>
            </form>
        </div>
    )
}