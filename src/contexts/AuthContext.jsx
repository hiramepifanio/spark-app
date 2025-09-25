import { createContext, useReducer } from "react"

const initialState = {
  user: null,
  tokens: null,
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
        tokens: {
          access: action.payload.tokens.access,
          refresh: action.payload.tokens.refresh,
        }
      }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [authState, authDispatch] = useReducer(authReducer, {
    user: null,
    tokens: null,
  })

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  )
}