import React, { useRef } from "react";
import emailjs from 'emailjs-com'
import toast, { Toaster } from 'react-hot-toast';

const FormularioEmail = (props) => {
    const form = useRef();
    const notify = () =>  {
        toast.success('el email se envio');
    } 

    const comprobarEstado = () => {
        if (form.current.user_name.value === '') {
            return false
        } else if (form.current.subject.value === '') {
            return false
        } else if (form.current.user_email.value === '') {
            return false
        } else {
            return true
        }
    }

    const enviarEmail = (e) => {

        const Enviar = comprobarEstado()
        if (Enviar === true) {

            emailjs.sendForm(
                process.env.REACT_APP_SERVICE,
                process.env.REACT_APP_TEMPLATE,
                form.current,
                process.env.REACT_APP_APIPUBLIC
            ).then((result) => {
                
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });


        } else (
            console.log('no enviar')
        )


    }

    return (
        <>
            <main className="mainContacto">
                <div className="conteinerContacto">
                    <div className="titulo">  Contacto </div>
                    <form ref={form} onSubmit={enviarEmail} id='formContacto'>
                        <label>Nombre</label>
                        <input type="text" name="user_name" className="context" />
                        <label>Asunto</label>
                        <input type="text" name="subject" className="context" />
                        <label>Email</label>
                        <input type="email" name="user_email" className="context" />
                        <label>Mensaje</label>
                        <textarea name="message" />
                        <input type="submit" value="Enviar" className="buttonEmail" />
                    </form>
                </div>
                <Toaster />
                
            </main>



        </>

    )
}

export default FormularioEmail