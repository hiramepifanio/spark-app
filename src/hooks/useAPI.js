import { use } from "react"
import { AuthContext } from "../contexts/AuthContext"

const BASE_URL = 'http://localhost:8000'
const GET = 'GET'
const POST = 'POST'
const PUT = 'PUT'
const DELETE = 'DELETE'

export function useAPI() {
  const { authState } = use(AuthContext)
  const token = authState.access

  async function call(endpoint, method, payload, options) {
    let _options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    if (payload) {
      console.log('pay', payload)
      _options.body = JSON.stringify(payload)
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, _options)
    let json = null
    try {
      json = await response.json()
    } catch {

    }

    return {
      status: response.status,
      isOk: response.ok,
      data: response.ok ? json : null,
      errors: response.ok ? null : json,
    }
  }

  async function get(endpoint, options = {}) {
    return call(endpoint, GET, null, options=options)
  }

  async function post(endpoint, payload, options = {}) {
    return call(endpoint, POST, payload, options=options)
  }

  async function put(endpoint, payload, options = {}) {
    return call(endpoint, PUT, payload, options=options)
  }

  async function del(endpoint, options = {}) {
    return call(endpoint, DELETE, null, options=options)
  }

  return { get, post, put, del }
}