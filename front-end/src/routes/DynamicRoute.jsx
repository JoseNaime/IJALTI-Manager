import React from 'react';
import MainContainer from "../components/MainContainer";
import MainContent from "../components/MainContent";

function DynamicRoute({apiUrl, params, headers, fieldNames, noDataButton, extraComponents={}}) {
    return (
        <>
            <MainContainer>
                <MainContent apiUrl={apiUrl}
                             params={params}
                             headers={headers}
                             fieldNames={fieldNames}
                             noDataButton={noDataButton}
                             extraComponents={extraComponents} />
            </MainContainer>
        </>
    );
}

export default DynamicRoute;