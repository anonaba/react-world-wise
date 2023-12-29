import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/FakeAuthContext'

function ProtectedRoutes({ children }) {
  const { isAthenticated } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (!isAthenticated) navigate('/')
  }, [isAthenticated, navigate])

  return isAthenticated ? children : null
}

ProtectedRoutes.propTypes = {
  children: PropTypes.element,
}

export default ProtectedRoutes
