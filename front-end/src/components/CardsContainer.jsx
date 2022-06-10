import React from 'react';
import CompanyIconTest from "../assets/images/icons/company_icon_test.png";
import Card from "./Card";

function CardsContainer({handleCardClick}) {
    return (
        <div className="basis-1/2 flex flex-col gap-y-2">
            <Card isActive={true}
                  id={1}
                  icon={CompanyIconTest}
                  title={"Titulo de Empleo"}
                  description={"Lorem ipsum dolor sit amet, consectetur \n" +
                      "adipiscing elit."}
                  optional={{
                      date: "20/01/2021",
                      status: "active",
                      counter: {
                          title: "Solicitudes",
                          count: "10"
                      }
                  }}
                  handleCardClick={handleCardClick}
            />
            <Card isActive={true}
                  id={2}
                  icon={CompanyIconTest}
                  title={"Titulo de Empleo"}
                  description={"Lorem ipsum dolor sit amet, consectetur \n" +
                      "adipiscing elit."}
                  optional={{
                      date: "20/01/2021",
                      status: "active",
                      counter: {
                          title: "Solicitudes",
                          count: "10"
                      }
                  }}
                  handleCardClick={handleCardClick}
            />
        </div>
    );
}

export default CardsContainer;