import React from 'react';
import RegisterTypeBtn from "./RegisterTypeBtn";
import EmployeeIcon from "../assets/images/employee_icon.png";
import CompanyIcon from "../assets/images/company_icon.png";

function RegisterType({setRegisterType}) {
    return (
        <div className="flex flex-col w-50 text-center justify-between mt-32">
            <h1 className="text-4xl ">Cuéntanos sobre de ti</h1>
                <hr className="my-8 opacity-5"/>
            <div >
                <h2 className="text-xl font-bold mb-14 opacity-70">¿Qué buscas en nuestra plataforma?</h2>
                <div className="flex flex-row justify-around">
                    <RegisterTypeBtn image={EmployeeIcon}
                                     onClick={() => setRegisterType("usuario")}>
                        Busco nuevas <br/>
                        oportunidades laborales
                    </RegisterTypeBtn>
                    <RegisterTypeBtn image={CompanyIcon}
                                     onClick={() => setRegisterType("empresa")}>
                        Busco empleados <br/>
                        para mi empresa
                    </RegisterTypeBtn>

                </div>
            </div>
        </div>
    );
}

export default RegisterType;