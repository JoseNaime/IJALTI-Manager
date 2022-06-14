// React Custom Hook for fetching data from API

import {useEffect, useState} from 'react';
import axios from "axios";

function useFetch({url, method, body = null, params = null, headers=null}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching to " + process.env.REACT_APP_API_URL + url+" with params: "+JSON.stringify(params));
        (async () => {
            try {
                setLoading(true)
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
                setLoading(false)
            }
        })();
    }, [url, method, body, headers]);

    return (
        {data, loading, error}
    )
}

export default useFetch;



