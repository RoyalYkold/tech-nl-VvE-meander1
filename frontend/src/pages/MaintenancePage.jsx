import { useState } from 'react'
import { api } from '../api'

export function MaintenancePage() {
  const [form, setForm] = useState({ type: 'onderhoud', subject: '', description: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    try {
      const result = await api('/private/maintenance', {
        method: 'POST',
        body: JSON.stringify(form),
      })
      setMessage(result.message)
      setForm({ type: 'onderhoud', subject: '', description: '' })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="page-shell">
      <div className="container narrow-shell">
        <div className="page-hero premium-panel">
          <p className="eyebrow">Serviceverzoek</p>
          <h1>Onderhoudsmelding of bewonersvraag</h1>
          <p>Een verzorgde route voor meldingen, verzoeken en praktische afstemming met de VvE.</p>
        </div>

        <article className="premium-panel">
          <form className="form" onSubmit={submit}>
            <label className="input-group">
              <span>Type verzoek</span>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="onderhoud">Onderhoudsmelding</option>
                <option value="vraag">Vraag</option>
              </select>
            </label>
            <label className="input-group">
              <span>Onderwerp</span>
              <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Onderwerp" />
            </label>
            <label className="input-group">
              <span>Beschrijving</span>
              <textarea required rows="6" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Omschrijf uw melding of vraag" />
            </label>
            <button className="btn btn-primary" type="submit">Indienen</button>
          </form>
          {message ? <p className="success">{message}</p> : null}
          {error ? <p className="error">{error}</p> : null}
        </article>
      </div>
    </section>
  )
}
