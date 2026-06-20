import { useState } from 'react'
import { api } from '../api'

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    try {
      const result = await api('/public/contact', {
        method: 'POST',
        body: JSON.stringify(form),
      })
      setMessage(result.message)
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="page-shell">
      <div className="container contact-grid">
        <article className="premium-panel contact-overview">
          <p className="eyebrow">Contact</p>
          <h1>Neem contact op met het bestuur of beheer.</h1>
          <p>
            Voor algemene vragen, bewonersverzoeken of aanvullende informatie over Meander1 kunt u
            onderstaand formulier gebruiken.
          </p>
          <div className="contact-details">
            <div>
              <strong>Locatie</strong>
              <span>Van der Palmkade, Amsterdam</span>
            </div>
            <div>
              <strong>Onderwerp</strong>
              <span>Bewonerscommunicatie, beheer en portalvragen</span>
            </div>
            <div>
              <strong>Respons</strong>
              <span>Heldere opvolging via bestuur of beheerpartner</span>
            </div>
          </div>
        </article>

        <article className="premium-panel">
          <form onSubmit={submit} className="form">
            <label className="input-group">
              <span>Naam</span>
              <input required placeholder="Uw naam" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            <label className="input-group">
              <span>E-mailadres</span>
              <input required type="email" placeholder="naam@voorbeeld.nl" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </label>
            <label className="input-group">
              <span>Bericht</span>
              <textarea required rows="6" placeholder="Waarmee kunnen we u helpen?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </label>
            <button className="btn btn-primary" type="submit">
              Verstuur bericht
            </button>
          </form>
          {message ? <p className="success">{message}</p> : null}
          {error ? <p className="error">{error}</p> : null}
        </article>
      </div>
    </section>
  )
}
