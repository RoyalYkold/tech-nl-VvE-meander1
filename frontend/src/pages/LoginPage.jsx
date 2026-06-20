import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../useAuth'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="container page small">
      <h1>Inloggen</h1>
      <form onSubmit={submit} className="form">
        <input type="email" required placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" required minLength="8" placeholder="Wachtwoord" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn" type="submit">
          Inloggen
        </button>
      </form>
      {error ? <p className="error">{error}</p> : null}
    </section>
  )
}
