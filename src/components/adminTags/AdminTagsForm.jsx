import { useForm } from "react-hook-form"
import { useProduct } from "../../context/ProductContext"
import { useEffect } from "react"


export default function AdminTagsForm({ handleModalClose, editObj, isOpen }) {

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()

    const { postTag, setEditObj } = useProduct()

    const onSubmit = data => {
        postTag(data)
        reset()
        handleModalClose()
    }

    useEffect(()=>{
        setFormValues(editObj)
    }, [editObj])
    useEffect(()=>{
        reset()
        setEditObj([])
    },[isOpen])

    function setFormValues(editObj){
        setValue("_id", editObj._id)
        setValue("name", editObj.name)
        setValue("viewValue", editObj.viewValue)
    }

    return (
        <>
            <form className={editObj?._id ? "register-form edit-background" : "register-form"} onSubmit={handleSubmit(onSubmit)}>
                <h1 className="section-title underline">
                    {editObj?._id ? "Editar Categoria" : "Crear Categoria"}
                </h1>
                <div className="inputs-container">
                    <div className="input-group">
                        <input type="text" className="display-off" {...register("_id")} />

                        <label className="input-title" htmlFor="name">Nombre:*</label>
                        <input type="text" className="form-input" autoFocus={true} {...register("name", { required: editObj?._id ? false : true, minLength: 2, maxLength: 30, pattern: /^[a-zA-Z\s]+$/ })} />
                        {errors.name?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.name?.type === "minLength" || errors.name?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                        {errors.name?.type === "pattern" && (<span className='input-error'>Solo se permiten caracteres alfabeticos</span>)}


                    </div>
                    <div className="input-group">
                        <label className="input-title" htmlFor="viewValue">Vista del usuario:*</label>
                        <input type="text" className="form-input" {...register("viewValue", { required: editObj?._id ? false : true, minLength: 2, maxLength: 30, pattern: /^[a-zA-Z\s]+$/ })} />
                        {errors.viewValue?.type === "required" && (<span className='input-error'>El campo es requerido</span>)}
                        {(errors.viewValue?.type === "minLength" || errors.viewValue?.type === "maxLength") && (<span className='input-error'>La cantidad de caracteres es invalida</span>)}
                        {errors.viewValue?.type === "pattern" && (<span className='input-error'>Solo se permiten caracteres alfabeticos</span>)}
                    </div>
                    <button type="submit" className="form-button">{editObj?._id ? "Editar" : "Crear"}</button>
                </div>
            </form>
        </>
    )
}