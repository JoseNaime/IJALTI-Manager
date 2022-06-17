import React from 'react';
import CompanyIconTest from "../assets/images/icons/company_icon_test.png";
import Card from "./Card";

function CardsContainer({selectedCardInfoId, data, handleCardClick, fieldNames= {}, children}) {

    const getCount = (card, fieldToCount) => {
        return card[fieldToCount].length > 0 ? card[fieldToCount].length : 0;
    }

    const cards = data.map((card, i) => {
        return (<Card key={i}
                      isSelected={selectedCardInfoId === card[fieldNames.id]}
                      isActive={true}
                      data={{
                          id: card[fieldNames.id],
                          icon: CompanyIconTest,
                          title: card[fieldNames.title],
                          subTitle: card[fieldNames.subTitle],
                          description: !fieldNames.subTitle && card[fieldNames.description],
                          date: !!fieldNames.date ? new Date(card[fieldNames.date]).toLocaleDateString() : null,
                          status: card.status,
                          counter: !!fieldNames.counter && {
                                title: fieldNames.counter.title,
                                count: fieldNames.counter.dynamicCount ? getCount(card, fieldNames.counter.count):card[fieldNames.counter.count]
                          }


                      }}
                      handleCardClick={(e) => handleCardClick(card)}
        />)
    });

    return (
        <div className="basis-1/2 flex flex-col mt-36 relative">
            {children}
            {cards}
        </div>
    );
}

export default CardsContainer;