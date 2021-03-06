import React, {useContext, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {GlobalContext} from "../GlobalProvider";
import {useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../Firebase/firebase-config';

const RegisterCompany = ({registerType}) => {
    const {putRequest} = useContext(GlobalContext);
    const [ setSubmitError] = useState(null);
    const navigate = useNavigate();

    return (
    <div className='ml-10 mr-10'>
        <Formik
            initialValues={{nombreComercial: '', nombreFiscal: '', correoCuenta: '', password: '', passwordConfirm: '', telefonoContacto: '', estado: '', ciudad: ''}}

            onSubmit={(values, {setSubmitting}) => {
                console.log(values);

                putRequest("/newAccount", {
                    data: {
                        nombreComercial: values.nombreComercial,
                        nombreFiscal: values.nombreFiscal,
                        correoCuenta: values.correoCuenta,
                        telefonoContacto: values.telefonoContacto,
                        estado: values.estado,
                        ciudad: values.ciudad
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
                    <div className="flex flex-col form-field">
                        <ErrorMessage name="nombreComercial" className="error" component="div"/>
                        <Field type="text" name="nombreComercial"/>
                        <label>*Nombre comercial de la empresa</label>
                    </div>
                    <div className="flex flex-col form-field">
                        <ErrorMessage name="nombreFiscal" className="error" component="div"/>
                        <Field type="text" name="nombreFiscal"/>
                        <label>*Nombre fiscal de la empresa</label>
                    </div>
                    <div className="flex flex-col form-field">
                            <ErrorMessage name="correoCuenta" className="error" component="div" />
                            <Field type="email" name="correoCuenta" />
                            <label>*Email</label>
                    </div>
                
        
                    <div className='flex flex-row gap-x-10'>
                        <div className="flex flex-col form-field flex-1">
                            <ErrorMessage name="password" className="error" component="div"/>
                            <Field type="password" name="password"/>
                            <label>*Contrase??a</label>
                        </div>
                        <div className="flex flex-col form-field flex-1">
                            <ErrorMessage name="passwordConfirm" className="error" component="div"/>
                            <Field type="password" name="passwordConfirm"/>
                            <label>*Confirmar contrase??a</label>
                        </div>
                    </div>

                    <div className="flex flex-row form-field">
                        <ErrorMessage name="telefonoContacto" className="error" component="div" />
                        <Field type="number" name="telefonoContacto" />
                        <label>*Tel??fono</label>
                    </div>
                    
                    <div className='flex flex-row gap-x-10'>
                        <div className="flex flex-col form-field flex-1">
                            <ErrorMessage name="estado" className="error" component="div"/>
                            <Field as="select" name="estado">
                                <option value="">Selecciona una opci??n</option>
                                <option value="aguascalientes">Aguascalientes</option>
                                <option value="baja California">Baja California</option>
                                <option value="baja California Sur">Baja California Sur</option>
                                <option value="campeche">Campeche</option>
                                <option value="chiapas">Chiapas</option>
                                <option value="chihuahua">Chihuahua</option>
                                <option value="ciudad de Mexico">Ciudad de M??xico</option>
                                <option value="coahuila">Coahuila</option>
                                <option value="colima">Colima</option>
                                <option value="durango">Durango</option>
                                <option value="estado de Mexico">Estado de M??xico</option>
                                <option value="guanajuato">Guanajuato</option>
                                <option value="guerrero">Guerrero</option>
                                <option value="hidalgo">Hidalgo</option>
                                <option value="jalisco">Jalisco</option>
                                <option value="michoacan">Michoac??n</option>
                                <option value="morelos">Morelos</option>
                                <option value="nayarit">Nayarit</option>
                                <option value="nuevo Leon">Nuevo Le??n</option>
                                <option value="oaxaca">Oaxaca</option>
                                <option value="puebla">Puebla</option>
                                <option value="queretaro">Quer??taro</option>
                                <option value="quintana Roo">Quintana Roo</option>
                                <option value="san Luis Potosi">San Luis Potos??</option>
                                <option value="sinaloa">Sinaloa</option>
                                <option value="sonora">Sonora</option>
                                <option value="tabasco">Tabasco</option>
                                <option value="tamaulipas">Tamaulipas</option>
                                <option value="tlaxcala">Tlaxcala</option>
                                <option value="veracruz">Veracruz</option>
                                <option value="yucatan">Yucat??n</option>
                                <option value="zacatecas">Zacatecas</option>
                            </Field>
                            <label>*Estado</label>
                        </div>
                        <div className="flex flex-col form-field flex-1">
                            <ErrorMessage name="ciudad" className="error" component="div"/>
                            <Field as="select" name="ciudad">
                                <option value="">Selecciona una opci??n</option>
                                <option value="zamora">Zamora</option>
                                <option value="sayulita">Sayulita</option>
                                <option value="guadalajara">Guadalajara</option>
                                <option value="tlajomulco">Tlajomulco</option>
                            </Field>
                            <label>*Ciudad</label>
                        </div>
                    </div>
                    <button className="primary-squared" type="submit" disabled={isSubmitting}>Registrate</button>
                </div>

            </Form>
        )}
        </Formik>
    </div>
  )
}

export default RegisterCompany