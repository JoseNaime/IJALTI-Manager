import React, {useContext, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {GlobalContext} from "../GlobalProvider";
import {useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth"; 
import { auth } from '../Firebase/firebase-config';

function LoginForm() {
    const {getRequest, login} = useContext(GlobalContext);
    const [submitError, setSubmitError] = useState(null);
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{email: '', password: ''}}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Email Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }

                if (!values.password) {
                    errors.password = 'Password Required';
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
                let newUser = {email: values.email}
                
                signInWithEmailAndPassword(auth, values.email, values.password)
                    .then((userCredential) => {
                        getRequest("/getRol", {email: values.email}).then(async res => {
                            const rol = res.data.rol;
                            if (res.status === 200) {
                                // Add role to user
                                newUser = {...newUser, role: rol}

                                // If user rol is "empresa" get its id
                                if (rol === "empresa") {
                                    const infoEmpresa = await getRequest("/empresaInfo", {email: values.email})
                                    newUser = {...newUser, id: infoEmpresa.data.empresaid}
                                }

                                // Add user to context
                                login(newUser);
                            } else {
                                setSubmitError(res.data);
                            }
                        }).then(() => {
                            setSubmitting(false);

                        })
                        alert("Login Successful!");
                        navigate("/");
                    })
                    .catch ((error) => {
                        console.log(error.message);
                        setSubmitError("Contrase??a o correo inv??lido");
                        alert(error.message);
                        setSubmitting(false);
                    })
                
            }}
        >
            {({isSubmitting}) => (
                <>
                    <h2 className="mb-10 text-4xl">LOGIN</h2>
                    <Form className="flex flex-col">
                        <div className="flex flex-col form-field">
                            <ErrorMessage name="email" className="error" component="div" />
                            <Field type="email" name="email" />
                            <label>*Email:</label>
                        </div>
                        <div className="flex flex-col form-field">
                            <ErrorMessage name="password" className="error" component="div" />
                            <Field type="password" name="password" />
                            <label>*Password:</label>
                        </div>
                        <button className="primary-squared" type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                        {submitError &&
                            <div className="error">{JSON.stringify(submitError)}</div>}
                    </Form>
                </>
            )}
        </Formik>
    );
}

export default LoginForm;