import React, {useContext, useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import AddSkillContainer from "../AddSkillContainer";
import {GlobalContext} from "../GlobalProvider";

const style = {
    textarea: {
        appearance: "none",
        fontSize: "1rem",
        color: "#929292",
        resize: "vertical",
        maxHeight: "350px",
        backgroundColor: "#F1F1F1",
        boxSizing: "border-box",
        padding: "10px 12px 160px",
        transform: 'TranslateY(-12%)'
    },
    container: {
        backgroundColor: '#F1F1F1',
        color: "#929292",
        padding: "3px 6px",
        position: 'relative',
        width: '100px',
        borderRadius: '10px',
        transform: 'TranslateY(40%)',
    },
    btn: {
        position: "relative",
        transform: 'TranslateY(-110%)'
    }

}

function CreateOfferForm() {
    const {putRequest, user} = useContext(GlobalContext);
    const [selectedSkills, setSelectedSkills] = useState([]);

    useEffect(() => {
        console.log(selectedSkills);
    }, [selectedSkills])

    return (
        <div className='ml-20 mr-20 mt-2'>
            <Formik
                initialValues={{
                    titulo: '',
                    habilidades: []
                }}
                validate={values => {
                    //const errors = {};

                    // return errors;
                }}
                onSubmit={(values, {setSubmitting}) => {
                    const newOffer = {
                        empresaID: user.id,
                        titulo: values.titulo,
                        descripcion: values.descripcion,
                        habilidades: selectedSkills.map(skill => ({habilidadid: skill.habilidadid, tiempoexperiencia: null}))
                    }
                    console.log(newOffer)

                    putRequest("/crearEmpleo", newOffer).then(res => {
                        console.log(res)
                        if (res.status === 201) {
                            alert("Empleo Creado")
                        }
                    }).finally(() => {
                        setSubmitting(false);
                    })
                }}
            >
                {({isSubmitting}) => (
                    <Form className="flex flex-col ">
                        <div className='flex flex-col gap-y-10'>
                            <h1 className="font-bold text-4xl text-center">Crear Empleo</h1>
                            <div className="flex flex-col form-field">
                                <ErrorMessage name="titulo" className="error" component="div" />
                                <Field type="text" name="titulo" placeholder="Título del empleo" />
                            </div>
                            <div className='text-left'>
                                <label className='font-bold text-2xl mb-10'>Habilidades:</label>
                                <AddSkillContainer setSelectedSkills={setSelectedSkills} />
                            </div>
                            <label className='font-bold text-2xl text-left' name="descripcion">Descripción:</label>
                            <Field component="textarea" name="descripcion" style={style.textarea} />

                            <button className="primary-squared"
                                    style={style.btn}
                                    type="submit"
                                    disabled={isSubmitting}>Crear
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateOfferForm;