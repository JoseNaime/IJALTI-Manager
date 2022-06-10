import React, { useEffect, useState } from 'react';
import CompanyIconTest from "../assets/images/icons/company_icon_test.png";
import Card from "./Card";

function CardsContainer({setCurrentCard}) {

    const [selectedCard, setSelectedCard] = useState(null);
    
    const handleClick = (e,data) => {
        setCurrentCard(data)
        setSelectedCard(data)
        console.log(data)
        console.log(e)
    }

    return (
        <div className="basis-1/2 flex flex-col gap-y-2">
            <Card isActive={true}
                  _id={'1'}
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
                  handleClick = {handleClick}
                  selectedCard = {selectedCard}
            />
            <Card isActive={true}
                  _id={'2'}
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
                  handleClick = {handleClick}
                  selectedCard = {selectedCard}
            />
        </div>
    );
}

export default CardsContainer;