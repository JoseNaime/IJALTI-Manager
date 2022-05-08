import React, {useContext, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {GlobalContext} from "../GlobalProvider";

function LoginForm() {
    const {postRequest, login} = useContext(GlobalContext);
    const [submitError, setSubmitError] = useState(null);

    return (
        <Formik
            initialValues={{email: '', password: ''}}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }

                if (!values.password) {
                    errors.password = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
                console.log(values)

                postRequest("/login", {email: values.email, password: values.password}).then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        login(res.data)

                    } else {
                        setSubmitError(res.data)
                    }
                }).then(() => {
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
                            <label>Email:</label>
                        </div>
                        <div className="flex flex-col form-field">
                            <ErrorMessage name="password" className="error" component="div" />
                            <Field type="password" name="password" />
                            <label>Password:</label>
                        </div>
                        <button className="primary-squared" type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                        {submitError && <div className="error">{submitError}</div>}
                    </Form>
                </>
            )}
        </Formik>
    );
}

export default LoginForm;