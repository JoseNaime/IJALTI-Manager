import React, {useContext, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {GlobalContext} from "../GlobalProvider";
import {useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../Firebase/firebase-config';

const RegisterEmployee = ({registerType}) => {
    const {putRequest} = useContext(GlobalContext);
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

                putRequest("/newAccount", {
                    data: {
                        nombre: values.nombre,
                        apellido: values.apellido,
                        sexo: values.sexo,
                        fechaNacimiento: values.fechaNacimiento,
                        nacionalidad: values.nacionalidad,
                        estadoCivil: values.estadoCivil,
                        rfc: values.rfc,
                        papelesVigentes: values.papelesVigentes,
                        correoCuenta: values.correoCuenta,
                        username: values.username,
                        telefonoCuenta: values.telefonoCuenta,
                        estado: values.estado,
                        ciudad: values.ciudad,
                    },
                    tipoCuenta: registerType
                }).then(res => {
                    console.log(res)
                    if (res.status === 201) {
                        createUserWithEmailAndPassword(auth, values.correoCuenta, values.password);
                        alert("Register Successful")
                        navigate("/login")
                    } else {
                        setSubmitError(res.data)
                    }
                }).then(() => {
                    setSubmitting(false);
                })
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
                                <option value="michoacan">Michoacán</option>
                                <option value="jalisco">Jalisco</option>
                                <option value="aguascalientes">Aguascalientes</option>
                                <option value="nayarit">Nayarit</option>
                            </Field>
                            <label htmlFor="">*Estado</label>
                        </div>
                        <div className="flex flex-col form-field flex-1">
                            <ErrorMessage name="ciudad" className="error" component="div"/>
                            <Field as="select" name="ciudad">
                                <option value="">Selecciona una opción</option>
                                <option value="zamora">Zamora</option>
                                <option value="sayulita">Sayulita</option>
                                <option value="guadalajara">Guadalajara</option>
                                <option value="tlajomulco">Tlajomulco</option>
                            </Field>
                            <label htmlFor="">*Ciudad</label>
                        </div>
                    </div>
                </div>

                <button className="primary-squared" type="submit" disabled={isSubmitting}>Registrate</button>
            </Form>
        )}
        </Formik>
    </div>
  )
}

export default RegisterEmployee