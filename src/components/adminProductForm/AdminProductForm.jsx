import './admin-product-form.css'
export default function AdminProductForm() {
    let formObj = {}
    function apHandleSubmit(e) {
        e.preventDefault()
        const [...elements] = e.target.elements
        console.log(elements)
        elements.forEach(element => {
            objectCreator(element.name, element.value)
        });
        console.log(formObj)
        return(formObj)
    }

    function objectCreator(propName, value){
        formObj[propName] = value
    }

    return (
        <div className="form-product-container">
            <div className="table-title mb-16">
                    <h1>Formulario de alta de productos</h1>
                </div>
            <form className="admin-product-form" onSubmit={(e) => apHandleSubmit(e)}>
                <div className="input-container">
                    <label htmlFor="productName" className="ap-input-title">Nombre del producto:</label>
                    <input type="text" className="ap-form-input" id="productName" name="productName" minLength={3} maxLength={60} autoFocus />
                </div>
                <div className="input-container">
                    <label htmlFor="productDate" className="ap-input-title">Fecha de ingreso:</label>
                    <input type="date" className="ap-form-input" id="productDate" name="productDate" minLength={3} maxLength={60} />
                </div>
                <div className="input-container">
                    <label htmlFor="productPrice" className="ap-input-title">Precio:</label>
                    <input type="text" pattern='^[0-9]+(\.[0-9]+)?$' className="ap-form-input" id="productPrice" name="productPrice" minLength={3} maxLength={60} />
                </div>
                <div className="input-container">
                    <label htmlFor="productDesc" className="ap-input-title">Descripcion:</label>
                    <textarea className='ap-form-input' name="productDesc" id="productDesc" minLength={6} maxLength={600} rows={6} cols={30}></textarea>
                </div>
                <div className="input-container">
                    <label htmlFor="productImage" className="ap-input-title">Imagen:</label>
                    <input type="file" className="ap-form-input" id="productImage" name="productImage" />
                </div>
                <button className='ap-form-btn'>Enviar</button>
            </form>
        </div>
    )
}