import { useEffect, useState } from 'react'
import { api } from '../api'
import { useAuth } from '../useAuth'

export function AdminPage() {
  const { isAdmin } = useAuth()
  const [users, setUsers] = useState([])
  const [maintenance, setMaintenance] = useState([])
  const [message, setMessage] = useState('')

  const [newsForm, setNewsForm] = useState({ title: '', summary: '', content: '', isPublic: false })
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    api('/private/admin/users').then(setUsers).catch(() => setUsers([]))
    api('/private/maintenance').then(setMaintenance).catch(() => setMaintenance([]))
  }, [])

  const addNews = async (e) => {
    e.preventDefault()
    const result = await api('/private/admin/news', {
      method: 'POST',
      body: JSON.stringify(newsForm),
    })
    setMessage(result.message)
    setNewsForm({ title: '', summary: '', content: '', isPublic: false })
  }

  const addCategory = async (e) => {
    e.preventDefault()
    const result = await api('/private/admin/categories', {
      method: 'POST',
      body: JSON.stringify({ name: categoryName }),
    })
    setMessage(result.message)
    setCategoryName('')
  }

  const uploadDocument = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const result = await api('/private/admin/documents', {
      method: 'POST',
      body: formData,
    })
    setMessage(result.message)
    e.currentTarget.reset()
  }

  const updateRole = async (id, role) => {
    await api(`/private/admin/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    })
    const refreshed = await api('/private/admin/users')
    setUsers(refreshed)
  }

  return (
    <section className="container page">
      <h1>Beheer</h1>
      <p>Beheer nieuws, documenten, gebruikers en categorieën.</p>
      {message ? <p className="success">{message}</p> : null}

      <div className="grid">
        <form className="card form" onSubmit={addNews}>
          <h3>Nieuws toevoegen</h3>
          <input required placeholder="Titel" value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} />
          <input placeholder="Samenvatting" value={newsForm.summary} onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })} />
          <textarea required rows="4" placeholder="Inhoud" value={newsForm.content} onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })} />
          <label>
            <input type="checkbox" checked={newsForm.isPublic} onChange={(e) => setNewsForm({ ...newsForm, isPublic: e.target.checked })} /> Openbaar
          </label>
          <button className="btn" type="submit">Opslaan</button>
        </form>

        <form className="card form" onSubmit={uploadDocument}>
          <h3>Document uploaden</h3>
          <input required name="title" placeholder="Titel" />
          <input name="description" placeholder="Beschrijving" />
          <input required name="categoryId" type="number" min="1" placeholder="Categorie ID" />
          <label>
            <input name="isPublic" type="checkbox" value="true" /> Openbaar
          </label>
          <input required name="file" type="file" />
          <button className="btn" type="submit">Upload</button>
        </form>

        <form className="card form" onSubmit={addCategory}>
          <h3>Categorie toevoegen</h3>
          <input required value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Naam categorie" />
          <button className="btn" type="submit">Toevoegen</button>
        </form>
      </div>

      <h2>Gebruikers</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Naam</th><th>E-mail</th><th>Rol</th><th>Appartement</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  {isAdmin ? (
                    <select value={u.role} onChange={(e) => updateRole(u.id, e.target.value)}>
                      <option value="admin">admin</option>
                      <option value="bestuur">bestuur</option>
                      <option value="bewoner">bewoner</option>
                    </select>
                  ) : u.role}
                </td>
                <td>{u.apartment_number || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Onderhoudsmeldingen</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Datum</th><th>Bewoner</th><th>Type</th><th>Onderwerp</th><th>Status</th></tr>
          </thead>
          <tbody>
            {maintenance.map((m) => (
              <tr key={m.id}>
                <td>{new Date(m.created_at).toLocaleDateString('nl-NL')}</td>
                <td>{m.user_name}</td>
                <td>{m.type}</td>
                <td>{m.subject}</td>
                <td>{m.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
