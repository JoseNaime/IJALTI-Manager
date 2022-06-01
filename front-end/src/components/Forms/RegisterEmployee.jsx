import React from 'react'
import {Formik, Form, Field} from 'formik';

const RegisterEmployee = () => {
  return (
    <div className='ml-8'>
        <Formik>
            <Form className="flex flex-col">
                <div className="flex flex-col form-field">
                    <Field type="email" name="email" />
                    <label>*Email:</label>
                </div>
                <div className="flex flex-col form-field">
                    <Field type="password" name="password" />
                    <label>*Password:</label>
                </div>
                <button className="primary-squared" type="submit">
                    Submit
                </button>
            </Form>
        </Formik>
    </div>
  )
}

export default RegisterEmployee