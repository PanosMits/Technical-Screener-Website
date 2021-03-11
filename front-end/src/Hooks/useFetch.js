import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
            .then(response => {
                if (!response.ok) { // error coming back from server
                    throw Error('could not fetch the data for that resource');
                }
                return response.json();
            })
            .then(data => {
                setIsLoading(false);
                setData(data);
                setError(null);
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    // auto catches network / connection error
                    setIsLoading(false);
                    setError(error.message);
                }
            });

        // abort the fetch
        return () => abortCont.abort();
    }, [url])

    return { data, isLoading, error };
}

export default useFetch;
