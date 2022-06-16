import {useEffect, useState} from 'react';
import axios from "axios";

function useFetch({url, method, body = null, params = null, headers=null}) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching to " + process.env.REACT_APP_API_URL + url+" with params: "+JSON.stringify(params));
        (async () => {
            try {
                setIsLoading(true)
                const response = await axios({
                    url: process.env.REACT_APP_API_URL + url,
                    method,
                    body: body,
                    params: params,
                    headers: headers
                });
                setData(response.data)
            } catch (err) {
                setError(err)
            } finally {
                setIsLoading(false)
            }
        })();
    }, [url, method, body, headers, params]);

    return (
        {data, isLoading, error}
    )
}

export default useFetch;



