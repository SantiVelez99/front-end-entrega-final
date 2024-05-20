import HandleSubmit from '../../utilities/handleSubmit/HandleSubmit'
import './admin-product-form.css'
import { useProduct } from '../../context/ProductContext'
export default function AdminProductForm() {

    const { addProduct } = useProduct();

    return (
        <div className="form-product-container">
            <div className="table-title mb-16">
                    <h1>Formulario de alta de productos</h1>
                </div>
            <form className="admin-product-form" onSubmit={(e) => addProduct(HandleSubmit(e))}>
                <div className="input-container">
                    <label htmlFor="productName" className="input-title">Nombre del producto:</label>
                    <input type="text" className="form-input" id="productName" name="productName" minLength={3} maxLength={60} autoFocus />
                </div>
                <div className="input-container">
                    <label htmlFor="productDate" className="input-title">Fecha de ingreso:</label>
                    <input type="date" className="form-input" id="productDate" name="productDate"/>
                </div>
                <div className="input-container">
                    <label htmlFor="productPrice" className="input-title">Precio:</label>
                    <input type="text" pattern='^[0-9]+(\.[0-9]+)?$' className="form-input" id="productPrice" name="productPrice" minLength={1} maxLength={60} />
                </div>
                <div className="input-container">
                    <label htmlFor="productDesc" className="input-title">Descripcion:</label>
                    <textarea className='form-textarea' name="productDesc" id="productDesc" minLength={6} maxLength={600} rows={6} cols={30} ></textarea>
                </div>
                <div className="input-container">
                    <label htmlFor="productImage" className="input-title">Imagen:</label>
                    <input type="file" className="form-input" id="productImage" name="productImage" />
                </div>
                <button className='form-btn' type='submit'>Enviar</button>
            </form>
        </div>
    )
}