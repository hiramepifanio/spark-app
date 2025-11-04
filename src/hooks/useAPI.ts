import { use } from "react"
import { AuthContext } from "../contexts/AuthContext"

const BASE_URL: string = 'http://localhost:8000'
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>
}

interface ApiResponse<T> {
  status: number
  isOk: boolean
  data: T | null
  errors: unknown | null
}

export function useAPI() {
  const { authState } = use(AuthContext)
  const token = authState.access

  async function call<T>(
    endpoint: string, 
    method: HttpMethod, 
    options: FetchOptions, 
    payload?: unknown
  ): Promise<ApiResponse<T>> {
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
    let json: T | null = null
    try {
      json = await response.json()
    } catch {

    }

    return {
      status: response.status,
      isOk: response.ok,
      data: response.ok ? json : null,
      errors: response.ok ? null : json
    }
  }

  async function get<T>(endpoint: string, options:FetchOptions = {}): Promise<ApiResponse<T>> {
    return call(endpoint, 'GET', options)
  }

  async function post(endpoint: string, payload: unknown, options:FetchOptions = {}) {
    return call(endpoint, 'POST', options, payload)
  }

  async function put(endpoint: string, payload: unknown, options:FetchOptions = {}) {
    return call(endpoint, 'PUT', options, payload)
  }

  async function del(endpoint: string, options = {}) {
    return call(endpoint, 'DELETE', options)
  }

  return { get, post, put, del }
}


// import { use } from "react"
// import { AuthContext } from "../contexts/AuthContext"

// const BASE_URL = 'http://localhost:8000'
// const GET = 'GET'
// const POST = 'POST'
// const PUT = 'PUT'
// const DELETE = 'DELETE'

// export function useAPI() {
//   const { authState } = use(AuthContext)
//   const token = authState.access

//   async function call(endpoint, method, payload, options) {
//     let _options = {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//         ...(token && { Authorization: `Bearer ${token}` }),
//         ...options.headers,
//       },
//       ...options,
//     }

//     if (payload) {
//       console.log('pay', payload)
//       _options.body = JSON.stringify(payload)
//     }

//     const response = await fetch(`${BASE_URL}${endpoint}`, _options)
//     let json = null
//     try {
//       json = await response.json()
//     } catch {

//     }

//     return {
//       status: response.status,
//       isOk: response.ok,
//       data: response.ok ? json : null,
//       errors: response.ok ? null : json,
//     }
//   }

//   async function get(endpoint, options = {}) {
//     return call(endpoint, GET, null, options=options)
//   }

//   async function post(endpoint, payload, options = {}) {
//     return call(endpoint, POST, payload, options=options)
//   }

//   async function put(endpoint, payload, options = {}) {
//     return call(endpoint, PUT, payload, options=options)
//   }

//   async function del(endpoint, options = {}) {
//     return call(endpoint, DELETE, null, options=options)
//   }

//   return { get, post, put, del }
// }