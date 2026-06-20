import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
    <section className="page-shell login-shell">
      <div className="container login-grid">
        <article className="login-showcase premium-panel">
          <p className="eyebrow">Bewonersomgeving</p>
          <h1>Een beveiligde login met premium rust en focus.</h1>
          <p>
            Toegang tot documenten, nieuws, onderhoud en persoonlijke informatie vanuit een heldere,
            stijlvolle bewonersinterface.
          </p>
          <div className="login-highlights">
            <div>
              <strong>Veilige toegang</strong>
              <span>Speciaal voor bewoners, bestuur en beheer.</span>
            </div>
            <div>
              <strong>Heldere structuur</strong>
              <span>Direct door naar dashboard, documenten en updates.</span>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80"
            alt="Interieur van een luxe appartementencomplex"
          />
        </article>

        <article className="login-form-card premium-panel">
          <div className="section-heading compact">
            <p className="eyebrow">Inloggen</p>
            <h2>Welkom terug bij Meander1</h2>
          </div>
          <form onSubmit={submit} className="form">
            <label className="input-group">
              <span>E-mailadres</span>
              <input type="email" required placeholder="naam@voorbeeld.nl" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="input-group">
              <span>Wachtwoord</span>
              <input type="password" required minLength="8" placeholder="Uw wachtwoord" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button className="btn btn-primary" type="submit">
              Inloggen
            </button>
          </form>
          {error ? <p className="error">{error}</p> : null}
          <p className="muted">
            Problemen met inloggen? <Link to="/contact">Neem contact op met het bestuur</Link>.
          </p>
        </article>
      </div>
    </section>
  )
}
