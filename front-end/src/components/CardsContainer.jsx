import React from 'react';
import CompanyIconTest from "../assets/images/icons/company_icon_test.png";
import Card from "./Card";

function CardsContainer({selectedCardInfoId, data, handleCardClick, fieldNames= {}}) {
    const cards = data.map((card, i) => {
        return (<Card key={i}
                      isSelected={selectedCardInfoId === card.empleoid}
                      isActive={true}
                      data={{
                          id: card.empleoid,
                          icon: CompanyIconTest,
                          title: card.titulo,
                          description: card.descripcion,
                          optional: {
                              date: new Date(!!fieldNames.date ? card[fieldNames.date] : card.postdate).toLocaleDateString(),
                              status: card.status,
                          }

                      }}
                      handleCardClick={(e) => handleCardClick(card)}
        />)
    });

    return (
        <div className="basis-1/2 flex flex-col">
            {cards}
        </div>
    );
}

export default CardsContainer;