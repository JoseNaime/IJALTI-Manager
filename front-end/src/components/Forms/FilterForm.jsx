import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import AddSkillContainer from '../AddSkillContainer';

function FilterForm() {

    const style = {
        btn: {
            position: "relative",
            transform: 'TranslateY(-10%) TranslateX(223%)',
            backgroundColor: 'var(--primary)',
            height: '25px',
	        width: '90px',
	        color: 'white',
	        fontWeight: 'lighter',
            borderRadius: '5px'
        },
        add: {
            color: 'black',
            width: '10px',
            transform: 'TranslateY(-190%)'
        }
    }

    return (
        <Formik>
            <Form className="flex flex-col">
                <div className="flex flex-col form-field gap-y-4">
                    <div className="flex form-field">
                        <ErrorMessage name="titulo" className="error" component="div"/>
                        <Field type="text" name="titulo" placeholder="Título"/>
                        {/* <label>Empresa</label> */}
                    </div>
                    <div className="flex form-field">
                        <ErrorMessage name="empresa" className="error" component="div"/>
                        <Field type="text" name="empresa" placeholder="Empresa"/>
                        {/* <label>Título</label> */}
                    </div>
                    {/* <button style={style.btn} type="submit">Buscar</button> */}
                </div>
                <button style={style.btn} type="submit">Buscar</button>
                <div className="flex flex-row" style={style.add}>
                    <AddSkillContainer />
                </div>
            </Form>
        </Formik>
    )
}

export default FilterForm;
