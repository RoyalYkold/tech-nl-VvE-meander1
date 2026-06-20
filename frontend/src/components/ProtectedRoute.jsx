import { Navigate } from 'react-router-dom'
import { useAuth } from '../useAuth'

export function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <p className="container">Laden...</p>
  }

  if (!user) {
    return <Navigate to="/inloggen" replace />
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
