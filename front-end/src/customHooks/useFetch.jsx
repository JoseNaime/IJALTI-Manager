// React Custom Hook for fetching data from API

import React, {useEffect, useState} from 'react';
import axios from "axios";

function useFetch({url, method, body, headers}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response = await axios({
                    url: process.env.REACT_APP_API_URL + url,
                    method,
                    data: body,
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



