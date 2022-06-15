import React from 'react';
import MainContainer from "../components/MainContainer";
import MainContent from "../components/MainContent";

function DynamicRoute({apiUrl, params, headers, cardDetailFields}) {
    return (
        <MainContainer>
            <MainContent apiUrl={apiUrl}
                         params={params}
                         headers={headers}
                         cardDetailFields={cardDetailFields} />
        </MainContainer>
    );
}

export default DynamicRoute;