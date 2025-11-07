import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useAPI } from "./useAPI"

interface UseFetchResult<T> {
    isLoading: boolean
    data: T | null
    setData: Dispatch<SetStateAction<T | null>>
    errors: unknown | null
}

export function useFetch<T>(endpoint: string, initialState: T | null = null): UseFetchResult<T> {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errors, setErrors] = useState<unknown | null>(null)
  const [data, setData] = useState<T | null>(initialState)
  const { get } = useAPI()

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      console.log()

      const { status, isOk, data, errors } = await get<T>(endpoint)
      
      if(isOk) {
        setData(data)
      } else {
        setErrors(errors)
      }
      
      setIsLoading(false)
    }

    fetchData()
  }, [endpoint])

  return {
    isLoading,
    data,
    setData,
    errors
  }
}