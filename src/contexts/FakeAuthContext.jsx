import PropTypes from 'prop-types'
import { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext()

const initState = {
  user: null,
  isAthenticated: false,
  error: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAthenticated: true }
    case 'logout':
      return { ...state, user: null, isAthenticated: false }
    case 'error':
      return {
        ...state,
        user: null,
        isAthenticated: false,
        error: action.payload,
      }
    default:
      throw new Error('Unknown Type')
  }
}

const FAKE_USER = {
  name: 'Dove',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
}

function AuthProvider({ children }) {
  const [{ user, isAthenticated, error }, dispatch] = useReducer(
    reducer,
    initState
  )

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: 'login', payload: FAKE_USER })
    } else {
      dispatch({
        type: 'error',
        payload: 'Your email and password does not matched in our system',
      })
    }
  }

  function logout() {
    dispatch({ type: 'logout' })
  }

  return (
    <AuthContext.Provider
      value={{ user, isAthenticated, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// customHook
function useAuth() {
  return useContext(AuthContext)
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}

export { AuthProvider, useAuth }
