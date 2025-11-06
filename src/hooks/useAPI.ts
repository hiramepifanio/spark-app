import { use } from "react"
import { AuthContext } from "../contexts/AuthContext"

const BASE_URL: string = 'http://localhost:8000'
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>
}

interface ApiSuccessResponse<R> {
  status: number
  isOk: true
  data: R
  errors: null
}

interface ApiErrorResponse {
  status: number
  isOk: false
  data: null
  errors: unknown
}

export type ApiResponse<R> = ApiSuccessResponse<R> | ApiErrorResponse

export function useAPI() {
  const { authState } = use(AuthContext)
  const token = authState.access

  async function call<R>(
    endpoint: string, 
    method: HttpMethod, 
    options: FetchOptions, 
    payload?: unknown
  ): Promise<ApiResponse<R>> {
    let _options: FetchOptions = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    if (payload) {
      _options.body = JSON.stringify(payload)
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, _options)
    let json: unknown = null
    try {
      json = await response.json()
    } catch {

    }

    if (!response.ok) {
      return {
        status: response.status,
        isOk: false,
        data: null,
        errors: json,
      }
    }

    return {
      status: response.status,
      isOk: true,
      data: json as R,
      errors: null,
    }
  }

  async function get<R>(endpoint: string, options:FetchOptions = {}): Promise<ApiResponse<R>> {
    return call<R>(endpoint, 'GET', options)
  }

  async function post<R>(endpoint: string, payload: unknown, options:FetchOptions = {}): Promise<ApiResponse<R>> {
    return call<R>(endpoint, 'POST', options, payload)
  }

  async function put<R>(endpoint: string, payload: unknown, options:FetchOptions = {}): Promise<ApiResponse<R>> {
    return call<R>(endpoint, 'PUT', options, payload)
  }

  async function del<R>(endpoint: string, options = {}): Promise<ApiResponse<R>> {
    return call<R>(endpoint, 'DELETE', options)
  }

  return { get, post, put, del }
}