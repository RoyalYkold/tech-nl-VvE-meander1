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
    <section className="container page small">
      <h1>Onderhoudsmelding of vraag</h1>
      <form className="form" onSubmit={submit}>
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="onderhoud">Onderhoudsmelding</option>
          <option value="vraag">Vraag</option>
        </select>
        <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Onderwerp" />
        <textarea required rows="6" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Beschrijving" />
        <button className="btn" type="submit">Indienen</button>
      </form>
      {message ? <p className="success">{message}</p> : null}
      {error ? <p className="error">{error}</p> : null}
    </section>
  )
}
