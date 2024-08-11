import { useForm } from 'react-hook-form'
import './contact.css'
import Swal from 'sweetalert2';
import { useProduct } from '../../context/ProductContext';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Contact() {
    const { url } = useProduct()
    const { user } = useUser()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    function checkLogin() {
        if (!user._id) {
            return (Swal.fire({
                icon: "warning",
                title: "Error de sesión",
                text: "Para enviar una consulta debes iniciar sesión",
                showConfirmButton: true,
                confirmButtonText: "Ir a Ingresar",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                background: "#0E1014",
                color: "#DCDEDF"
            }).then(res => {
                if (res.isConfirmed) {
                    navigate('/login')
                }
            }))
        }
    }

    useEffect(() => {
        checkLogin()
    }, [])

    const onSubmit = data => {
        if (!user._id) {
            checkLogin()
            throw new Error("error de sesion");
        }
        if (data.contactImages.length > 3) {
            return (Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Limite de imagenes superado (maximo 3)",
                timer: 3000,
                background: "#0E1014",
                color: "#DCDEDF",
            }));
        }
        data.id = crypto.randomUUID()
        data.contactDate = new Date().getTime()
        console.log(data)
        const formData = new FormData()
        for (let i = 0; i < data.contactImages.length; i++) {
            formData.append(`contactImages`, data.contactImages[i])
        }
        formData.append("fullName", data.fullName)
        formData.append("email", data.email)
        formData.append("message", data.message)
        formData.append("user", user._id)
        try {
            postContact(formData)
        } catch (error) {
            console.log(error)
        }


    }

    async function postContact(obj) {
        try {
            const response = await axios.post(`${url}/contact`, obj)
            if (!response) {
                return Swal.fire({
                    icon: "error",
                    titleText: "Error al enviar su ticket", background: "#0E1014",
                    color: "#DCDEDF",
                })
            }
            Swal.fire({
                icon: "success",
                titleText: "Ticket enviado correctamente!", background: "#0E1014",
                color: "#DCDEDF",
            })
            reset()
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error"
            })
        }
    }

    return (
        <main className="main-container" id='contactContainer'>
            <div className="contact-form-title">
                <h1>Envianos tu consulta</h1>
            </div>
            <div className="contact-container">
                <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-container">
                        <label className="form-label">Nombre Completo:</label>
                        <input type="text" className="form-input" {...register("fullName", { required: true, minLength: 6, maxLength: 60 })} autoFocus />
                        {errors.fullName?.type === "required" && (<span className='input-error'>Campo obligatorio</span>)}
                        {(errors.fullName?.type === "minLength" || errors.fullName?.type === "maxLength") && (<span className='input-error'>Cantidad de caracteres invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-input" {...register("email", { required: true, maxLength: 60 })} />
                        {errors.email?.type === "required" && (<span className='input-error'>Campo obligatorio</span>)}
                        {errors.email?.type === "maxLength" && (<span className='input-error'>Cantidad de caracteres invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="form-label">Su Mensaje:</label>
                        <textarea className="form-textarea" {...register("message", { required: true, cols: 30, rows: 10, minLength: 10, maxLength: 1000 })}></textarea>
                        {errors.message?.type === "required" && (<span className='input-error'>Campo obligatorio</span>)}
                        {errors.message?.type === "maxLength" && (<span className='input-error'>Cantidad de caracteres invalida</span>)}
                    </div>
                    <div className="input-container">
                        <label className="form-label">Adjutar imagen/s (opcional, max 3):</label>
                        <input type="file" className="form-input" accept="image/*" multiple {...register("contactImages")} />
                    </div>
                    <div className="input-container"><button className="form-button" type="submit">Enviar</button></div>
                </form>
                <div className="contact-map-container">
                    <div className="contact-map-title">
                        <h4>Donde encontrarnos:</h4>
                    </div>
                    <iframe className="contact-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d418.6638867202922!2d-60.73223329452155!3d-32.91637805762605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b652e544921673%3A0xb554ef74cdbf7583!2sAv.%20G%C3%A9nova%207872%2C%20S2006%20Rosario%2C%20Santa%20Fe!5e0!3m2!1ses-419!2sar!4v1709139596891!5m2!1ses-419!2sar" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </main>
    )
}