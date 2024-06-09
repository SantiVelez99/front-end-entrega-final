import { useEffect } from 'react';
import { useProduct } from '../../context/ProductContext';
import './admin-product-form.css'
import { useForm } from 'react-hook-form';
import { formatTimeStampToInputDate } from '../../utilities/formatTStampToInput/formatTStampToInput';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function AdminProductForm({ handleModalClose, editObj, isOpen }) {

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const { postProduct, setEditObj } = useProduct()
    const onSubmit = data => {
        data.productPrice = +data.productPrice
        data.productDate = new Date(data.productDate).getTime()
        data.productDescPictures = (data.productDescPictures).split("\n");
        data.productTags = (data.productTags).split(", ");
        data.productDesc = (data.productDesc).split("\n");
        try {
            postProduct(data)
            reset();
            handleModalClose();
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        setFormValues(editObj)
    }, [editObj])
    useEffect(() => {
        reset()
        setEditObj([])
    }, [isOpen])
    async function setFormValues(editObj) {
        if (editObj) {
            const keys = await Object.keys(editObj);
            const values = await Object.values(editObj);
            let i = 0
            values[0] = formatTimeStampToInputDate(values[0])
            values[8] = values[8].join(", ")
            values[7] = values[7].join("\n")
            values[1] = values[1].join("\n")
            keys.forEach(key => {

                setValue(key, values[i])
                i++
            })
        }
    }
    function switchSection(e, id) {
        const array = Array.from(e.target.parentElement.parentElement.children)
        let array2 = []
        array.forEach(obj => {
            if ((obj.id).includes("section")) {
                array2.push(obj)
            }
        })
        array2.forEach(obj => {
            if (obj.id === id) {
                obj.className = "section visible"
            } else {
                obj.className = "section"
            }
        })

    }
    return (
        <div className={editObj.id ? "form-product-container edit-background" : "form-product-container"}>
            <div className="table-title mb-16">
                <h1>{editObj?.id ? "Editar Producto" : "Alta de productos"}</h1>
            </div>
            <form className="admin-product-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="section visible" id="section1">
                    <button type='button' className='switch-button left' title='A 4/4' onClick={(e) => switchSection(e, "section4")}><FontAwesomeIcon className='btn-icon' icon={faCaretLeft} /></button>
                    <div className="input-container">
                        <input type="text" className='display-off' {...register("id")} />
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
                        <textarea className='form-textarea' title='Separar cada parrafo con un ENTER' {...register("productDesc", { required: true, cols: 30, rows: 5, minLength: 3, maxLength: 2000 })}></textarea>
                        {errors.productDesc?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productDesc?.type === "minLength" || errors.productDesc?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">Imagen(URL):</label>
                        <input type="url" className="form-input" {...register("productImage", { required: true, minLength: 3, maxLength: 200 })} />
                        {errors.productImage?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productImage?.type === "minLength" || errors.productImage?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <button type='button' className='switch-button right' title='A 2/4' onClick={(e) => switchSection(e, "section2")}><FontAwesomeIcon className='btn-icon' icon={faCaretRight} /></button>
                </div>

                <div id="section2" className="section">
                    <button type='button' className='switch-button left' title='A 1/4' onClick={(e) => switchSection(e, "section1")}><FontAwesomeIcon className='btn-icon' icon={faCaretLeft} /></button>
                    <div className="input-container">
                        <label className='input-title'>Video:</label>
                        <input type="url" className='form-input' {...register("productVideo", { required: true, minLength: 3, maxLength: 200 })} />
                        {errors.productVideo?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productVideo?.type === "minLength" || errors.productVideo?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">Imagen de portada(URL):</label>
                        <input type="url" className="form-input" {...register("productPortrait", { required: true, minLength: 3, maxLength: 200 })} />
                        {errors.productPortrait?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productPortrait?.type === "minLength" || errors.productPortrait?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">Imagenes extras(URLs):</label>
                        <textarea type="text" className="form-textarea" placeholder='Separar los links con un ENTER' {...register("productDescPictures", { required: true, cols: 30, rows: 5, minLength: 3, maxLength: 600 })} />
                        {errors.productDescPictures?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productDescPictures?.type === "minLength" || errors.productDescPictures?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">Tags:</label>
                        <input type="text" className="form-input" placeholder='Separar los tags con ,'{...register("productTags", { required: true, minLength: 3, maxLength: 200 })} />
                        {errors.productTags?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productTags?.type === "minLength" || errors.productTags?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">Desarrollador:</label>
                        <input type="text" className="form-input" {...register("productDeveloper", { required: true, minLength: 3, maxLength: 60 })} />
                        {errors.productDeveloper?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productDeveloper?.type === "minLength" || errors.productDeveloper?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <button type='button' className='switch-button right' title='A 3/4' onClick={(e) => switchSection(e, "section3")}><FontAwesomeIcon className='btn-icon' icon={faCaretRight} /></button>
                </div>
                <div id="section3" className="section">
                    <button type='button' className='switch-button left' title='A 2/4' onClick={(e) => switchSection(e, "section2")}><FontAwesomeIcon className='btn-icon' icon={faCaretLeft} /></button>
                    <h2 className='section-title'>Requisitos Minimos:</h2>
                    <div className="input-container">
                        <label className="input-title">Sistema Operativo:</label>
                        <input type="text" className="form-input" {...register("productSoMin", { required: true, minLength: 3, maxLength: 60 })} />
                        {errors.productSoMin?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productSoMin?.type === "minLength" || errors.productSoMin?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">CPU:</label>
                        <input type="text" className="form-input" {...register("productCPUMin", { required: true, minLength: 3, maxLength: 60 })} />
                        {errors.productCPUMin?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productCPUMin?.type === "minLength" || errors.productCPUMin?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">RAM:</label>
                        <input type="text" className="form-input" {...register("productRAMMin", { required: true, minLength: 3, maxLength: 60 })} />
                        {errors.productRAMMin?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productRAMMin?.type === "minLength" || errors.productRAMMin?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">GPU:</label>
                        <input type="text" className="form-input" {...register("productGPUMin", { required: true, minLength: 3, maxLength: 60 })} />
                        {errors.productGPUMin?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productGPUMin?.type === "minLength" || errors.productGPUMin?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">DirectX:</label>
                        <input type="text" className="form-input" {...register("productDXMin", { required: true, minLength: 3, maxLength: 60 })} />
                        {errors.productDXMIN?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productDXMin?.type === "minLength" || errors.productDXMin?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">Espacio en disco:</label>
                        <input type="text" className="form-input" {...register("productSpaceMin", { required: true, minLength: 3, maxLength: 60 })} />
                        {errors.productSpaceMin?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productSpaceMin?.type === "minLength" || errors.productSpaceMin?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <button type='button' className='switch-button right' title='A 4/4' onClick={(e) => switchSection(e, "section4")}><FontAwesomeIcon className='btn-icon' icon={faCaretRight} /></button>
                </div>
                <div id="section4" className="section">
                    <button type='button' className='switch-button left' title='A 3/4' onClick={(e) => switchSection(e, "section3")}><FontAwesomeIcon className='btn-icon' icon={faCaretLeft} /></button>
                    <h2 className='section-title'>Requisitos Recomendados:</h2>
                    <div className="input-container">
                        <label className="input-title">Sistema Operativo:</label>
                        <input type="" className="form-input" {...register("productSoRec", { required: true, minLength: 3, maxLength: 60 })} />
                        {errors.productSoRec?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productSoRec?.type === "minLength" || errors.productSoRec?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">CPU:</label>
                        <input type="text" className="form-input" {...register("productCPURec", { required: true, minLength: 3, maxLength: 60 })} />
                        {errors.productCPURec?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productCPURec?.type === "minLength" || errors.productCPURec?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">RAM:</label>
                        <input type="text" className="form-input" {...register("productRAMRec", { required: true, minLength: 3, maxLength: 60 })} />
                        {errors.productRAMRec?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productRAMRec?.type === "minLength" || errors.productRAMRec?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">GPU:</label>
                        <input type="text" className="form-input" {...register("productGPURec", { required: true, minLength: 3, maxLength: 60 })} />
                        {errors.productGPURec?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productGPURec?.type === "minLength" || errors.productGPURec?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">DirectX:</label>
                        <input type="text" className="form-input" {...register("productDXRec", { required: true, minLength: 3, maxLength: 60 })} />
                        {errors.productDXRec?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productDXRec?.type === "minLength" || errors.productDXRec?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">Espacio en disco:</label>
                        <input type="text" className="form-input" {...register("productSpaceRec", { required: true, minLength: 3, maxLength: 60 })} />
                        {errors.productSpaceRec?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productSpaceRec?.type === "minLength" || errors.productSpaceRec?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <button type='button' className='switch-button right' title='A 1/4' onClick={(e) => switchSection(e, "section1")}><FontAwesomeIcon className='btn-icon' icon={faCaretRight} /></button>
                </div>
                <button className='form-btn' type='submit'>{editObj.id ? "Editar" : "Crear"}</button>
            </form>
        </div>
    )
}