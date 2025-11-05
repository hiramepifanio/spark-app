import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useAPI } from "./useAPI"

interface UseFetchResult<T> {
    isLoading: boolean
    fetchedData: T | null
    setFetchedData: Dispatch<SetStateAction<T | null>>
    errors: unknown | null
}

export function useFetch<T>(endpoint: string, initialState: T): UseFetchResult<T> {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errors, setErrors] = useState<unknown | null>(null)
  const [fetchedData, setFetchedData] = useState<T | null>(initialState)
  const { get } = useAPI()

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      console.log(endpoint)

      const { status, isOk, data, errors } = await get<T>(endpoint)
      
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