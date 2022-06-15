import React, {useContext, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
//import { auth } from '../Firebase/firebase-config';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

function CreateOfferForm() {
    // const {getRequest, login} = useContext(GlobalContext);
    // const [submitError, setSubmitError] = useState(null);
    
    const style = {
        textarea: {
            appearance: "none",
            fontSize: "1rem",
            color: "#929292",
            resize: "vertical",
            backgroundColor: "#F1F1F1",
            boxSizing: "border-box",
            padding: "10px 12px 160px",
            transform: 'TranslateY(-12%)'
        },
        container: {
            backgroundColor: '#F1F1F1',
            color: "#929292",
            padding: "3px 6px",
            position: 'relative',
            width: '100px',
            borderRadius: '10px',
            transform: 'TranslateY(40%)',
        },
        btn: {
            position: "relative",
            transform: 'TranslateY(-110%)'
        }

    }

    return (
        <div className='ml-20 mr-20 mt-2'>
            <Formik
                initialValues={{titulo: '', descripcion: '', empresaID: 6, habilidades: {habilidadid: 2, tiempoexperiencia: 3}}}
                validate={values => {
                    //const errors = {};

                    // return errors;
                }}
                onSubmit={(values, {setSubmitting}) => {
                    console.log(values);
    
                    // putRequest("/crearEmpleo", {
                    //     data: {
                    //         titulo: values.titulo,
                    //         habilidades: values.habilidades,
                    //         descripcion: values.descripcion
                    //     },
                    // }).then(res => {
                    //     console.log(res)
                    //     if (res.status === 201) {
                    //         createUserWithEmailAndPassword(auth, values.correoCuenta, values.password);
                    //         alert("Empleo Creado")
                    //         navigate("/login")
                    //     } else {
                    //         setSubmitError(res.data)
                    //     }
                    // }).then(() => {
                    //     setSubmitting(false);
                    // })
                }}
            >
            {({isSubmitting}) => (
                <Form className="flex flex-col">
                    <div className='flex flex-col gap-y-10'>
                        <h className = "font-bold text-4xl text-center">Crear Empleo</h>
                        <div className="flex flex-col form-field">
                            <ErrorMessage name="titulo" className="error" component="div"/>
                            <Field type="text" name="titulo" placeholder = "Título del empleo"/>
                        </div>
                        <div className='text-left'>
                            <label className='font-bold text-2xl'>Habilidades:</label>
                            <div style={style.container} className='text-center'>Agregar <FontAwesomeIcon icon={faPlus} /></div>
                        </div>
                        <label className='font-bold text-2xl text-left' name="descripcion">Descripción:</label>
                        <Field component="textarea" name="descripcion" style={style.textarea} />
                        
                        <button className="primary-squared" style={style.btn} type="submit" disabled={isSubmitting}>Crear</button>
                    </div>
                </Form>
            )}
            </Formik>
        </div>
      )
    }

export default CreateOfferForm;