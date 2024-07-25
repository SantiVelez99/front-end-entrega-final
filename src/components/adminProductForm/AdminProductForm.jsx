import { useEffect, useState } from 'react';
import { useProduct } from '../../context/ProductContext';
import './admin-product-form.css'
import { useForm } from 'react-hook-form';
import { formatTimeStampToInputDate } from '../../utilities/formatTStampToInput/formatTStampToInput';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function AdminProductForm({ handleModalClose, editObj }) {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const { postProduct, tags, getTags } = useProduct()
    const [ tagList, setTagList ] = useState([])
    const onSubmit = data => {
        console.log(data)
        data.productPrice = +data.productPrice
        data.productDate = new Date(data.productDate).getTime()
        console.log(data.productDescPictures)
        const productMinReq = {
            productSoMin: data.productSoMin,
            productCPUMin: data.productCPUMin,
            productRAMMin: data.productRAMMin,
            productGPUMin: data.productGPUMin,
            productSpaceMin: data.productSpaceMin
        }
        const productMaxReq = {
            productSoRec: data.productSoRec,
            productCPURec: data.productCPURec,
            productRAMRec: data.productRAMRec,
            productGPURec: data.productGPURec,
            productSpaceRec: data.productSpaceRec
        }
        const formData = new FormData()
        for (let i = 0; i < data.productDescPictures.length; i++) {
            formData.append(`productDescPictures`, data.productDescPictures[i])
        }
        tagList.forEach(tag => formData.append("productTags", tag))

        formData.append("id", data._id)
        formData.append("productName", data.productName)
        formData.append("productPrice", data.productPrice)
        formData.append("productDesc", data.productDesc)
        formData.append("productDate", data.productDate)
        formData.append("productDeveloper", data.productDeveloper)
        formData.append("productVideo", data.productVideo)
        formData.append("productMinReq", JSON.stringify(productMinReq))
        formData.append("productMaxReq", JSON.stringify(productMaxReq))
        formData.append("productImage", data.productImage.length ? data.productImage[0] : false)
        formData.append("productPortrait", data.productPortrait.length ? data.productPortrait[0] : false)
        try {
            postProduct(formData)
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
        getTags()
    }, [])
    async function setFormValues(editObj) {
        let array = []

        if (Object.keys(editObj).length > 0) {
            console.log(editObj)
            const keys = Object.keys(editObj);
            const values = Object.values(editObj);
            setRequirementsEdit(editObj.productMinReq)
            setRequirementsEdit(editObj.productMaxReq)
            let i = 0
            values[4] = formatTimeStampToInputDate(values[4])
            keys.forEach(key => {
                setValue(key, values[i])
                i++
            })
            editObj.productTags?.forEach(tag => {
                array.push(tag._id)
                setTagList(array)
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
    const reqLow = {
        productSoMin: "Windows 10",
        productCPUMin: "Intel i3 8100 / AMD Ryzen 3 3100",
        productRAMMin: "4 GB",
        productGPUMin: "nvidia GTX 1060 3GB / AMD RX 590"
    }
    const reqMedium = {
        productSoMin: "Windows 10",
        productCPUMin: "Intel i5 9400 / AMD Ryzen 5 5500",
        productRAMMin: "8 GB",
        productGPUMin: "nvidia RTX 2060 / AMD RX 5700-XT"
    }
    const reqHigh = {
        productSoMin: "Windows 10",
        productCPUMin: "Intel i5 10600k / AMD Ryzen 5 5600",
        productRAMMin: "16 GB",
        productGPUMin: "nvidia RTX 3060 / AMD RX 6600-XT"
    }
    const reqLowRec = {
        productSoRec: "Windows 10",
        productCPURec: "Intel i3 8100 / AMD Ryzen 3 3100",
        productRAMRec: "4 GB",
        productGPURec: "nvidia GTX 1060 3GB / AMD RX 590"
    }
    const reqMediumRec = {
        productSoRec: "Windows 10",
        productCPURec: "Intel i5 9400 / AMD Ryzen 5 5500",
        productRAMRec: "8 GB",
        productGPURec: "nvidia RTX 2060 / AMD RX 5700-XT"
    }
    const reqHighRec = {
        productSoRec: "Windows 10",
        productCPURec: "Intel i5 10600k / AMD Ryzen 5 5600",
        productRAMRec: "16 GB",
        productGPURec: "nvidia RTX 3060 / AMD RX 6600-XT"
    }
    function setRequirements(obj) {
        const requirements = JSON.parse(obj)
        const keys = Object.keys(requirements)
        const values = Object.values(requirements)
        for (let i = 0; i < keys.length; i++) {
            setValue(keys[i], values[i])
        }
    }
    function setRequirementsEdit(obj){
        const keys = Object.keys(obj)
        const values = Object.values(obj)
        for (let i = 0; i < keys.length; i++) {
            setValue(keys[i], values[i])
        }
    }
    function addTag(value) {
        if(!tagList.includes(value)) setTagList( [...tagList, value] )
    }
    function tagListRender(id) {
        let name;
        tags.forEach(tag => {
            if (tag._id === id) name = tag.viewValue
        })
        return name
    }
    function tagListRemove(id) {
        const newTagList = tagList.filter(tag => tag !== id)
        console.log(newTagList)
        setTagList(newTagList)
    }
    return (
        <div className={editObj._id ? "form-product-container edit-background" : "form-product-container"}>
            <div className="table-title mb-16">
                <h1>{editObj?._id ? "Editar Producto" : "Alta de productos"}</h1>
            </div>
            <form className="admin-product-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="section visible" id="section1">
                    <button type='button' className='switch-button left' title='A 4/4' onClick={(e) => switchSection(e, "section4")}><FontAwesomeIcon className='btn-icon' icon={faCaretLeft} /></button>
                    <div className="input-container">
                        <input type="text" className='display-off' {...register("id")} />
                        <label className="input-title">Nombre del producto:</label>
                        <input type="text" className="form-input" autoFocus={true} {...register("productName", { required: editObj._id ? false : true, minLength: 3, maxLength: 60 })} />
                        {errors.productName?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productName?.type === "minLength" || errors.productName?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">Fecha de ingreso:</label>
                        <input type="date" className="form-input" {...register("productDate", { required: editObj._id ? false : true })} />
                        {errors.productDate?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">Precio:</label>
                        <input type="number" className="form-input" step={.01} {...register("productPrice", { required: editObj._id ? false : true, min: 0, max: 100000, })} />
                        {errors.productPrice?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">Descripcion:</label>
                        <textarea className='form-textarea' title='Separar cada parrafo con un ENTER' {...register("productDesc", { required: editObj._id ? false : true, cols: 30, rows: 5, minLength: 3, maxLength: 2000 })}></textarea>
                        {errors.productDesc?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productDesc?.type === "minLength" || errors.productDesc?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">Imagen Card:</label>
                        <input type="file" accept='image/*' className="form-input" {...register("productImage", { required: editObj._id ? false : true })} />
                        {errors.productImage?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                    </div>
                    <button type='button' className='switch-button right' title='A 2/4' onClick={(e) => switchSection(e, "section2")}><FontAwesomeIcon className='btn-icon' icon={faCaretRight} /></button>
                </div>

                <div id="section2" className="section">
                    <button type='button' className='switch-button left' title='A 1/4' onClick={(e) => switchSection(e, "section1")}><FontAwesomeIcon className='btn-icon' icon={faCaretLeft} /></button>
                    <div className="input-container">
                        <label className='input-title'>Video:</label>
                        <input type="url" className='form-input' {...register("productVideo", { required: editObj._id ? false : true, minLength: 3, maxLength: 200 })} />
                        {errors.productVideo?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productVideo?.type === "minLength" || errors.productVideo?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">Imagen de portada:</label>
                        <input type="file" accept='image/*' className="form-input" {...register("productPortrait", { required: editObj._id ? false : true })} />
                        {errors.productPortrait?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">Imagenes extras (4):</label>
                        <input type="file" accept='image/*' className="form-input" multiple {...register("productDescPictures", { required: editObj._id ? false : true })} />
                        {errors.productDescPictures?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">Tags:</label>
                        <select className='input-select' name="tagSelect" id="tagSelect" onChange={(e) => addTag(e.target.value)}>
                            {
                                tags.map(tag => {
                                    return (
                                        <option key={tag._id} value={tag._id}>{tag.viewValue}</option>
                                    )
                                })
                            }
                        </select>
                        <ul className='tag-list'>
                            {
                                tagList?.map(tag => {
                                    return (
                                        <div className='tag-container' key={tag}>
                                            <li className='tag-item'>{tagListRender(tag)}</li>
                                            <button className='tag-button' type='button' onClick={() => tagListRemove(tag)}>x</button>
                                        </div>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="input-container">
                        <label className="input-title">Desarrollador:</label>
                        <input type="text" className="form-input" {...register("productDeveloper", { required: editObj._id ? false : true, minLength: 3, maxLength: 60 })} />
                        {errors.productDeveloper?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productDeveloper?.type === "minLength" || errors.productDeveloper?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <button type='button' className='switch-button right' title='A 3/4' onClick={(e) => switchSection(e, "section3")}><FontAwesomeIcon className='btn-icon' icon={faCaretRight} /></button>
                </div>
                <div id="section3" className="section">
                    <button type='button' className='switch-button left' title='A 2/4' onClick={(e) => switchSection(e, "section2")}><FontAwesomeIcon className='btn-icon' icon={faCaretLeft} /></button>
                    <h2 className='section-title'>Requisitos Minimos:</h2>
                    <div className="input-container">
                        <select className='input-select' name="requirements" id="requirements" onChange={(e) => setRequirements(e.target.value)}>
                            <option value={JSON.stringify(reqLow)}>Requisitos bajos</option>
                            <option value={JSON.stringify(reqMedium)}>Requisitos medios</option>
                            <option value={JSON.stringify(reqHigh)}>Requisitos altos</option>
                        </select>
                    </div>
                    <div className="input-container">
                        <label className="input-title">Sistema Operativo:</label>
                        <input type="text" className="form-input" {...register("productSoMin", { required: editObj._id ? false : true, minLength: 3, maxLength: 60 })} />
                        {errors.productSoMin?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productSoMin?.type === "minLength" || errors.productSoMin?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">CPU:</label>
                        <input type="text" className="form-input" {...register("productCPUMin", { required: editObj._id ? false : true, minLength: 3, maxLength: 60 })} />
                        {errors.productCPUMin?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productCPUMin?.type === "minLength" || errors.productCPUMin?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">RAM:</label>
                        <input type="text" className="form-input" {...register("productRAMMin", { required: editObj._id ? false : true, minLength: 3, maxLength: 60 })} />
                        {errors.productRAMMin?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productRAMMin?.type === "minLength" || errors.productRAMMin?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">GPU:</label>
                        <input type="text" className="form-input" {...register("productGPUMin", { required: editObj._id ? false : true, minLength: 3, maxLength: 60 })} />
                        {errors.productGPUMin?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productGPUMin?.type === "minLength" || errors.productGPUMin?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">Espacio en disco:</label>
                        <input type="text" className="form-input" {...register("productSpaceMin", { required: editObj._id ? false : true, minLength: 3, maxLength: 60 })} />
                        {errors.productSpaceMin?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productSpaceMin?.type === "minLength" || errors.productSpaceMin?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <button type='button' className='switch-button right' title='A 4/4' onClick={(e) => switchSection(e, "section4")}><FontAwesomeIcon className='btn-icon' icon={faCaretRight} /></button>
                </div>
                <div id="section4" className="section">
                    <button type='button' className='switch-button left' title='A 3/4' onClick={(e) => switchSection(e, "section3")}><FontAwesomeIcon className='btn-icon' icon={faCaretLeft} /></button>
                    <h2 className='section-title'>Requisitos Recomendados:</h2>
                    <div className="input-container">
                        <select className='input-select' name="requirements" id="requirements" onChange={(e) => setRequirements(e.target.value)}>
                            <option value={JSON.stringify(reqLowRec)}>Requisitos bajos</option>
                            <option value={JSON.stringify(reqMediumRec)}>Requisitos medios</option>
                            <option value={JSON.stringify(reqHighRec)}>Requisitos altos</option>
                        </select>
                    </div>
                    <div className="input-container">
                        <label className="input-title">Sistema Operativo:</label>
                        <input type="" className="form-input" {...register("productSoRec", { required: editObj._id ? false : true, minLength: 3, maxLength: 60 })} />
                        {errors.productSoRec?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productSoRec?.type === "minLength" || errors.productSoRec?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">CPU:</label>
                        <input type="text" className="form-input" {...register("productCPURec", { required: editObj._id ? false : true, minLength: 3, maxLength: 60 })} />
                        {errors.productCPURec?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productCPURec?.type === "minLength" || errors.productCPURec?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">RAM:</label>
                        <input type="text" className="form-input" {...register("productRAMRec", { required: editObj._id ? false : true, minLength: 3, maxLength: 60 })} />
                        {errors.productRAMRec?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productRAMRec?.type === "minLength" || errors.productRAMRec?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">GPU:</label>
                        <input type="text" className="form-input" {...register("productGPURec", { required: editObj._id ? false : true, minLength: 3, maxLength: 60 })} />
                        {errors.productGPURec?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productGPURec?.type === "minLength" || errors.productGPURec?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="input-title">Espacio en disco:</label>
                        <input type="text" className="form-input" {...register("productSpaceRec", { required: editObj._id ? false : true, minLength: 3, maxLength: 60 })} />
                        {errors.productSpaceRec?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.productSpaceRec?.type === "minLength" || errors.productSpaceRec?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                    </div>
                    <button type='button' className='switch-button right' title='A 1/4' onClick={(e) => switchSection(e, "section1")}><FontAwesomeIcon className='btn-icon' icon={faCaretRight} /></button>
                    <button className='form-btn' type='submit'>{editObj._id ? "Editar" : "Crear"}</button>
                </div>
            </form>
        </div>
    )
}