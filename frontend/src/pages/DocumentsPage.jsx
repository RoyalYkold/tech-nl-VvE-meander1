import { useEffect, useState } from 'react'
import { api } from '../api'
import { Card } from '../components/Card'

export function DocumentsPage({ privateMode = false }) {
  const [docs, setDocs] = useState([])
  const [categories, setCategories] = useState([])
  const [query, setQuery] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const endpoint = privateMode ? '/private/document-categories' : '/public/document-categories'
    api(endpoint).then(setCategories).catch(() => setCategories([]))
  }, [privateMode])

  useEffect(() => {
    const mode = privateMode ? '/private/documents' : '/public/documents'
    const params = new URLSearchParams({ search: query })
    if (categoryId) params.set('categoryId', categoryId)
    api(`${mode}?${params.toString()}`).then(setDocs).catch((e) => setError(e.message))
  }, [query, categoryId, privateMode])

  return (
    <section className="page-shell">
      <div className="container">
        <div className="page-hero premium-panel">
          <p className="eyebrow">{privateMode ? 'Bewonersdocumenten' : 'Openbare documenten'}</p>
          <h1>{privateMode ? 'Documenten voor bewoners' : 'Documenten en openbare stukken'}</h1>
          <p>Een rustige bibliotheek voor reglementen, notulen, downloads en belangrijke referenties.</p>
        </div>

        <div className="filter-bar premium-panel filter-grid">
          <label className="input-group">
            <span>Zoeken</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Zoek documenten" />
          </label>
          <label className="input-group">
            <span>Categorie</span>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">Alle categorieën</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </label>
        </div>

        {error ? <p className="error page-feedback">{error}</p> : null}

        <div className="grid">
          {docs.map((doc) => (
            <Card
              key={doc.id}
              title={doc.title}
              subtitle={doc.category_name}
              actions={
                privateMode ? (
                  <a className="btn btn-primary" href={`${import.meta.env.VITE_API_URL || 'http://localhost:4000/api'}/private/documents/${doc.id}/download`}>
                    Download
                  </a>
                ) : null
              }
            >
              <p>{doc.description}</p>
            </Card>
          ))}
          {!docs.length ? (
            <article className="premium-panel empty-state">
              <h3>Nog geen documenten beschikbaar</h3>
              <p>Nieuwe stukken verschijnen hier zodra ze worden gepubliceerd.</p>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  )
}
