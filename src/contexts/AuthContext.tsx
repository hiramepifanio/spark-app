import { createContext, useEffect, useReducer, ReactNode, Dispatch } from "react"

interface AuthState {
  user: any
  organization: any
  access: string | null
  refresh: string | null
}

type AuthAction =
  | {
      type: 'LOGIN'
      payload: {
        user: any
        organization: any
        access: string
        refresh: string
      }
    }
  | { type: 'LOGOUT' }

interface AuthContextType {
  authState: AuthState
  authDispatch: Dispatch<AuthAction>
}

const initialState: AuthState = {
  user: null,
  organization: null,
  access: null,
  refresh: null,
}

export const AuthContext = createContext<AuthContextType>({
  authState: initialState,
  authDispatch: () => {},
})

function authReducer(state: AuthState, action: AuthAction): AuthState {
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

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, authDispatch] = useReducer(authReducer, initialState, () => {
    const storedAuthState = localStorage.getItem('authState')
    return storedAuthState ? JSON.parse(storedAuthState) : initialState
  })

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(authState))
  }, [authState])

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  )
}