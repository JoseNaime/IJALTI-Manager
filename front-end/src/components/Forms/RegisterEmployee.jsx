import React, {useContext, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {GlobalContext} from "../GlobalProvider";
import {useNavigate} from "react-router-dom";

const RegisterEmployee = ({registerType}) => {
    const {postRequest} = useContext(GlobalContext);
    const [submitError, setSubmitError] = useState(null);
    const navigate = useNavigate();

    return (
    <div className='ml-8'>
        <Formik
            initialValues={{
                nombre: '',
                apellido:'',
                sexo:'',
                fechaNacimiento:'',
                nacionalidad:'',
                estadoCivil:'',
                rfc:'',
                papelesVigentes:'',
                correoCuenta:'',
                password:'',
                passwordconfirm:'',
                username:'',
                telefonoCuenta:'',
                estado:'',
                ciudad:''
            }}
            validate={values => {
                
            }}
            onSubmit={(values, {setSubmitting}) => {
                console.log(values);
                setSubmitting(false);

                // postRequest("/newAccount", {email: values.email, password: values.password}).then(res => {
                //     console.log(res)
                //     if (res.status === 200) {
                //         alert("Login Successful")
                //         login(res.data)
                //         navigate("/logint")
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
                <div className='flex flex-col gap-y-5'>
                    <div className='flex flex-row gap-x-10'>
                        <div className="flex flex-col form-field flex-1">
                            <ErrorMessage name="nombre" className="error" component="div"/>
                            <Field type="text" name="nombre"/>
                            <label htmlFor="">*Nombre</label>
                        </div>
                        <div className="flex flex-col form-field flex-1">
                            <ErrorMessage name="apellido" className="error" component="div"/>
                            <Field type="text" name="apellido"/>
                            <label htmlFor="">*Apellido</label>
                        </div>
                    </div>
                    <div className='flex flex-row gap-x-10'>
                        <div className="flex flex-col form-field flex-1">
                            <ErrorMessage name="sexo" className="error" component="div"/>
                            <Field as="select" name="sexo">
                                <option value="">Selecciona tu sexo</option>
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                                <option value="otro">Otro</option>
                            </Field>
                            <label htmlFor="">*Sexo</label>
                        </div>
                        <div className="flex flex-col form-field flex-1">
                            <ErrorMessage name="fechaNacimiento" className="error" component="div"/>
                            <Field type="date" name="fechaNacimiento"/>
                            <label htmlFor="">*Fecha de nacimiento</label>
                        </div>
                    </div>
                    <div className='flex flex-row gap-x-10'>
                        <div className="flex flex-col form-field flex-1">
                            <ErrorMessage name="nacionalidad" className="error" component="div"/>
                            <Field type="text" name="nacionalidad"/>
                            <label htmlFor="">*Nacionalidad</label>
                        </div>
                        <div className="flex flex-col form-field flex-1">
                            <ErrorMessage name="estadoCivil" className="error" component="div"/>
                            <Field as="select" name="estadoCivil">
                                <option value="">Selecciona tu estado civil</option>
                                <option value="soltero">Soltero</option>
                                <option value="casado">Casado</option>
                                <option value="otro">Otro</option>
                            </Field>
                            <label htmlFor="">*Estado civil</label>
                        </div>
                    </div>
                    <div className='flex flex-row gap-x-10'>
                        <div className="flex flex-col form-field flex-1">
                            <ErrorMessage name="rfc" className="error" component="div"/>
                            <Field type="text" name="rfc"/>
                            <label htmlFor="">*RFC</label>
                        </div>
                        <div className="flex flex-col form-field flex-1">
                            <ErrorMessage name="papelesVigentes" className="error" component="div"/>
                            <Field as="select" name="papelesVigentes">
                                <option value="">Selecciona una opción</option>
                                <option value="visa">Visa</option>
                                <option value="pasaporte">Pasaporte</option>
                                <option value="ambos">Ambos</option>
                                <option value="ninguno">Ninguno</option>
                            </Field>
                            <label htmlFor="">*Visa y pasaporte vigentes</label>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-y-5'>
                    <div className='flex flex-row gap-x-10'>
                        <div className="flex flex-col form-field flex-1">
                            <ErrorMessage name="correoCuenta" className="error" component="div"/>
                            <Field type="email" name="correoCuenta"/>
                            <label htmlFor="">*Email</label>
                        </div>
                    </div>
                    <div className='flex flex-row gap-x-10'>
                        <div className="flex flex-col form-field flex-1">
                            <ErrorMessage name="password" className="error" component="div"/>
                            <Field type="password" name="password"/>
                            <label htmlFor="">*Contraseña</label>
                        </div>
                        <div className="flex flex-col form-field flex-1">
                            <ErrorMessage name="passwordconfirm" className="error" component="div"/>
                            <Field type="password" name="passwordconfirm"/>
                            <label htmlFor="">*Confirmar contraseña</label>
                        </div>
                    </div>
                    <div className='flex flex-row gap-x-10'>
                        <div className="flex flex-col form-field flex-1">
                            <ErrorMessage name="username" className="error" component="div"/>
                            <Field type="text" name="username"/>
                            <label htmlFor="">*Username</label>
                        </div>
                        <div className="flex flex-col form-field flex-1">
                            <ErrorMessage name="telefonoCuenta" className="error" component="div"/>
                            <Field type="number" name="telefonoCuenta"/>
                            <label htmlFor="">*Número de teléfono</label>
                        </div>
                    </div>
                    <div className='flex flex-row gap-x-10'>
                    <div className="flex flex-col form-field flex-1">
                            <ErrorMessage name="estado" className="error" component="div"/>
                            <Field as="select" name="estado">
                                <option value="">Selecciona una opción</option>
                                <option value="visa">Michoacán</option>
                                <option value="pasaporte">Jalisco</option>
                                <option value="ambos">Aguascalientes</option>
                                <option value="ninguno">Nayarit</option>
                            </Field>
                            <label htmlFor="">*Estado</label>
                        </div>
                        <div className="flex flex-col form-field flex-1">
                            <ErrorMessage name="ciudad" className="error" component="div"/>
                            <Field as="select" name="ciudad">
                                <option value="">Selecciona una opción</option>
                                <option value="visa">Zamora</option>
                                <option value="pasaporte">Sayulita</option>
                                <option value="ambos">Guadalajara</option>
                                <option value="ninguno">Tlajomulco</option>
                            </Field>
                            <label htmlFor="">*Ciudad</label>
                        </div>
                    </div>
                </div>

                <button className="primary-squared" type="submit" disabled={isSubmitting}>Submit</button>
            </Form>
        )}
        </Formik>
    </div>
  )
}

export default RegisterEmployee