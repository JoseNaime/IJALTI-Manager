import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import AddSkillContainer from '../AddSkillContainer';

function FilterForm({title,type}) {

    const style = {
        btn: {
            backgroundColor: 'var(--primary)',
            height: '25px',
	        width: '90px',
	        color: 'white',
	        fontWeight: 'lighter',
            borderRadius: '5px'
        },
        add: {
            color: 'black',
        }
    }

    return (
        <Formik>
            <Form className="flex flex-col mt-5 w-full">
                <div className="flex flex-col form-field gap-y-4">
                    <div className="flex form-field">
                        <ErrorMessage name="titulo" className="error" component="div"/>
                        <Field type="text" name="titulo" placeholder="Título"/>
                        {/* <label>Empresa</label> */}
                    </div>
                    <div className="flex form-field">
                        <ErrorMessage name="empresa" className="error" component="div"/>
                        <Field type="text" name="empresa" placeholder="Nombre"/>
                        {/* <label>Título</label> */}
                    </div>
                    {/* <button style={style.btn} type="submit">Buscar</button> */}
                </div>
                <div className='w-full flex flex-row justify-around'>
                    <div className="flex flex-row" style={style.add}>
                        <AddSkillContainer />
                    </div>
                    <button style={style.btn} type="submit">Buscar</button>
                </div>
            </Form>
        </Formik>
    )
}

export default FilterForm;
