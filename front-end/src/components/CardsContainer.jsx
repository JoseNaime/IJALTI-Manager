import React from 'react';
import CompanyIconTest from "../assets/images/icons/company_icon_test.png";
import Card from "./Card";
import SearchBarPremium from "./SearchBarPremium";


const style = {
    toggleCreateOfferContainer: {
        height: "50px",
    }
}

function CardsContainer({
                            selectedCardInfoId,
                            data,
                            handleCardClick,
                            fieldNames = {},
                            extraComponents = {},
                            setFilters,
                            extraFunctions = {}
                        }) {

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
                              count: fieldNames.counter.dynamicCount ? getCount(card, fieldNames.counter.count) : card[fieldNames.counter.count]
                          }


                      }}
                      handleCardClick={(e) => handleCardClick(card)}
        />)
    });

    return (<div className="basis-1/2 flex flex-col relative">
        <div className="w-full h-full mt-10">
            {extraFunctions.ToggleCreateOfferContainer &&
                <div style={style.toggleCreateOfferContainer} className="flex flex-row justify-center">
                    <button className="w-full h-full opacity-70"
                            onClick={extraFunctions.ToggleCreateOfferContainer}>Crear
                                                                                Nuevo
                                                                                Empleo
                    </button>
                </div>
            }

            {cards}
        </div>
        <SearchBarPremium setFilters={setFilters}/>
    </div>);
}

export default CardsContainer;