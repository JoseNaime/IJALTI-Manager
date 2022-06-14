import React from 'react';
import MainContainer from "../components/MainContainer";
import MainContent from "../components/MainContent";

function DynamicRoute({apiUrl, params, headers}) {
    return (
        <MainContainer>
            <MainContent apiUrl={apiUrl}
                         params={params}
                         headers={headers} />
        </MainContainer>
    );
}

export default DynamicRoute;