import React from 'react';
import Card from "./Card";
import CompanyIconTest from "../assets/images/icons/company_icon_test.png";

const style = {
    container: {
        position: 'absolute',
        backgroundColor: 'white',
        height: "400px",
        width: "80%",
        top: '-1px',
        left: '50%',
        transform: 'translate(-50%, -100%)',
        boxShadow: '0px -2px 10px rgba(0,0,0,0.10)',
    }
}

function OfferApplicationsContainer({offerApplications}) {
    return (
        <div style={style.container} className="rounded-t-xl overflow-y-scroll">
            <div>
                {offerApplications.length>0 && offerApplications.map((offerApplication, index) => {
                    return (
                        <div key={index}>
                            <Card data={{
                                title: offerApplication.nombre + ' ' + offerApplication.apellido,
                                icon: CompanyIconTest,
                                subTitle: offerApplication.rolactual,
                                date: new Date(offerApplication.aplicacionfecha).toLocaleDateString(),
                            }} />
                        </div>
                    )
                })}
            </div>

        </div>
    );
}

export default OfferApplicationsContainer;