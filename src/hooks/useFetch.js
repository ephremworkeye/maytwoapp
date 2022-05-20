import { useState, useEffect } from "react";

export function useFetch (url) {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=> {
        const controller = new AbortController() 
        const fetchData = async () => {

            setIsPending(true) // loading started
            try {
                const res = await fetch(url, { signal: controller.signal })
                // if there is an error other than network error
                if (!res.ok) {
                    throw new Error(res.statusText) 
                }
                const json = await res.json()
                
                setIsPending(false) // loading complete
                setData(json)
                setError(null) // if fetch is successfull, no error
            } catch(err) {
                if (err.name === 'AbortError'){
                    console.log('the fetch was aborted')
                }else {
                    setIsPending(false) // if error no more loading
                    setError('Could not fetch the data') // custom error message
                }
            }
           
        }

        fetchData()
        // clean up function
        return () => {
            controller.abort()
        }
    }, [url])

    return { data, isPending, error }
}