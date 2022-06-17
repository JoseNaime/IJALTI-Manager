import React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import AddSkillContainer from '../AddSkillContainer';

function FilterForm({title, type, toggleSearch, setFilters, placeHolders}) {
    const [selectedSkills, setSelectedSkills] = React.useState([]);

    const style = {
        btn: {
            backgroundColor: 'var(--primary)',
            height: '35px',
            width: '100%',
            color: 'white',
            fontWeight: 'lighter',
            borderRadius: '5px',
            boxShadow: '0px 2px 10px rgba(0,0,0,0.20)',
        },
        add: {
            color: 'black',
        }
    }

    return (
        <Formik
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(false);
                const filters = {
                    firstField: {
                        name: placeHolders.firstField,
                        value: values.firstField,
                    },
                    secondField: {
                        name: placeHolders.secondField,
                        value: values.secondField,
                    },
                    skills: selectedSkills

                }
                setFilters(filters);
                toggleSearch();
            }}

            initialValues={{firstField: '', secondField: ''}}
        >
            <Form className="flex flex-col mt-5 w-full">
                <div className="flex flex-col form-field gap-y-4">
                    <div className="flex form-field">
                        <ErrorMessage name="secondFiled" className="error" component="div" />
                        <Field style={{color: "white"}}
                               type="text"
                               name="secondField"
                               placeholder={placeHolders.secondField} />
                        {/* <label>Empresa</label> */}
                    </div>
                    <div className="flex form-field">
                        <ErrorMessage name="firstField" className="error" component="div" />
                        <Field style={{color: "white"}}
                               type="text"
                               name="firstField"
                               placeholder={placeHolders.firstField} />
                        {/* <label>Título</label> */}
                    </div>


                    {/* <button style={style.btn} type="submit">Buscar</button> */}
                </div>
                <div style={{color: 'black'}} className='w-full flex flex-row justify-around'>
                    <AddSkillContainer setSelectedSkills={setSelectedSkills} />
                </div>
                <button style={style.btn} type="submit">Buscar</button>
            </Form>
        </Formik>
    )
}

export default FilterForm;
