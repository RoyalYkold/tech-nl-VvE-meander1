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
    <section className="page-shell">
      <div className="container">
        <div className="page-hero premium-panel">
          <p className="eyebrow">Beheer</p>
          <h1>Beheercentrum voor bestuur en administratie</h1>
          <p>Beheer nieuws, documenten, categorieën en bewonersrollen vanuit één consistente interface.</p>
        </div>

        {message ? <p className="success page-feedback">{message}</p> : null}

        <div className="grid admin-form-grid">
          <form className="premium-panel form" onSubmit={addNews}>
            <h3>Nieuws toevoegen</h3>
            <label className="input-group">
              <span>Titel</span>
              <input required placeholder="Titel" value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} />
            </label>
            <label className="input-group">
              <span>Samenvatting</span>
              <input placeholder="Samenvatting" value={newsForm.summary} onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })} />
            </label>
            <label className="input-group">
              <span>Inhoud</span>
              <textarea required rows="4" placeholder="Inhoud" value={newsForm.content} onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })} />
            </label>
            <label className="checkbox-row">
              <input type="checkbox" checked={newsForm.isPublic} onChange={(e) => setNewsForm({ ...newsForm, isPublic: e.target.checked })} />
              <span>Openbaar</span>
            </label>
            <button className="btn btn-primary" type="submit">Opslaan</button>
          </form>

          <form className="premium-panel form" onSubmit={uploadDocument}>
            <h3>Document uploaden</h3>
            <label className="input-group">
              <span>Titel</span>
              <input required name="title" placeholder="Titel" />
            </label>
            <label className="input-group">
              <span>Beschrijving</span>
              <input name="description" placeholder="Beschrijving" />
            </label>
            <label className="input-group">
              <span>Categorie ID</span>
              <input required name="categoryId" type="number" min="1" placeholder="Categorie ID" />
            </label>
            <label className="checkbox-row">
              <input name="isPublic" type="checkbox" value="true" />
              <span>Openbaar</span>
            </label>
            <label className="input-group">
              <span>Bestand</span>
              <input required name="file" type="file" />
            </label>
            <button className="btn btn-primary" type="submit">Upload</button>
          </form>

          <form className="premium-panel form" onSubmit={addCategory}>
            <h3>Categorie toevoegen</h3>
            <label className="input-group">
              <span>Naam categorie</span>
              <input required value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Naam categorie" />
            </label>
            <button className="btn btn-primary" type="submit">Toevoegen</button>
          </form>
        </div>

        <div className="table-section">
          <div className="section-heading compact">
            <p className="eyebrow">Gebruikers</p>
            <h2>Rollen en bewonersgegevens</h2>
          </div>
          <div className="table-wrap premium-panel">
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
        </div>

        <div className="table-section">
          <div className="section-heading compact">
            <p className="eyebrow">Onderhoud</p>
            <h2>Binnengekomen meldingen</h2>
          </div>
          <div className="table-wrap premium-panel">
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
        </div>
      </div>
    </section>
  )
}
