import { useEffect, useState } from "react"
import { useAPI } from "./useAPI"

export function useFetch(endpoint) {
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState()
  const [fetchedData, setFetchedData] = useState()
  const { get } = useAPI()

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)

      const { status, isOk, data, errors } = await get(endpoint)
      
      if(isOk) {
        setFetchedData(data)
      } else {
        setErrors(errors)
      }
      
      setIsLoading(false)
    }

    fetchData()
  }, [endpoint])

  return {
    isLoading,
    fetchedData,
    setFetchedData,
    errors
  }
}