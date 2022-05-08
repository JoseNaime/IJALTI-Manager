import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';

function LoginForm() {
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
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({isSubmitting}) => (
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
                </Form>
            )}
        </Formik>
    );
}

export default LoginForm;