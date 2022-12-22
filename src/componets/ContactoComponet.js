import React, { useRef } from "react";
import emailjs from 'emailjs-com'
import toast, { Toaster } from 'react-hot-toast';

const FormularioEmail = (props) => {
    const form = useRef();


    const comprobarEstado = () => {
        if (form.current.user_name.value !== '' && form.current.subject.value !== '' && form.current.user_email.value !== '') {
            return true
        } else {
            return false

        }
    }

    // ...
    


    const enviarEmail = (e) => {
        e.preventDefault();
        const ToastLoading = toast.loading('Loading...');

        const Enviar = comprobarEstado()
        if (Enviar === true) {

            emailjs.sendForm(
                process.env.REACT_APP_SERVICE,
                process.env.REACT_APP_TEMPLATE,
                form.current,
                process.env.REACT_APP_APIPUBLIC
            ).then((result) => {
                toast.dismiss(ToastLoading);
                toast.success('El mensaje fue enviado');
                console.log(result.text);
            }, (error) => {
                toast.dismiss(ToastLoading);
                toast.error('Error');
                console.log(error.text);
            });

            form.current.user_name.value = ''
            form.current.subject.value = ''
            form.current.user_email.value = ''
            form.current.message.value = ''


        } else {
            toast.dismiss(ToastLoading);
            toast.error('Complete todos los campos');
            console.log('no enviar')
        }
            
        


    }

    return (
        <>
            <main className="mainContacto">
                <div className="conteinerContacto">
                    <div className="titulo">  Contacto </div>
                    <form ref={form} onSubmit={enviarEmail} id='formContacto'>
                        <input type={'hidden'} name='page_name'></input>
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