import React from 'react';
import MainContainer from "../components/MainContainer";
import MainContent from "../components/MainContent";

function DynamicRoute({apiUrl, params, headers, fieldNames, extraComponents={}}) {
    return (
        <>
            <MainContainer>
                <MainContent apiUrl={apiUrl}
                             params={params}
                             headers={headers}
                             fieldNames={fieldNames}
                             extraComponents={extraComponents} />
            </MainContainer>
        </>
    );
}

export default DynamicRoute;