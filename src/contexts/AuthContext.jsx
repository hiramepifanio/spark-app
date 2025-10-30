import { createContext, useEffect, useReducer } from "react"

const initialState = {
  user: null,
  organization: null,
  access: null,
  refresh: null,
}

export const AuthContext = createContext({
  state: initialState,
  dispatch: () => {}
})

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload.user,
        organization: action.payload.organization,
        access: action.payload.access,
        refresh: action.payload.refresh,
      }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [authState, authDispatch] = useReducer(authReducer, initialState, () => {
    const storedAuthState = localStorage.getItem('authState')
    return storedAuthState ? JSON.parse(storedAuthState) : initialState
  })

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(authState), [authState])
  })

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  )
}