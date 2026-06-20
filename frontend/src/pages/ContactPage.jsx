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
    <section className="container page">
      <h1>Contact</h1>
      <p>Voor algemene vragen kunt u contact opnemen met het bestuur via onderstaand formulier.</p>
      <form onSubmit={submit} className="form">
        <input required placeholder="Naam" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input required type="email" placeholder="E-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <textarea required rows="6" placeholder="Bericht" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        <button className="btn" type="submit">
          Verstuur
        </button>
      </form>
      {message ? <p className="success">{message}</p> : null}
      {error ? <p className="error">{error}</p> : null}
    </section>
  )
}
