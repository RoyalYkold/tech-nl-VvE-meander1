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
    <section className="container page">
      <h1>{privateMode ? 'Documenten' : 'Openbare documenten'}</h1>
      <div className="filters">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Zoek documenten" />
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Alle categorieën</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      {error ? <p className="error">{error}</p> : null}
      <div className="grid">
        {docs.map((doc) => (
          <Card
            key={doc.id}
            title={doc.title}
            subtitle={doc.category_name}
            actions={
              privateMode
                ? <a className="btn btn-secondary" href={`${import.meta.env.VITE_API_URL || 'http://localhost:4000/api'}/private/documents/${doc.id}/download`}>Download</a>
                : null
            }
          >
            <p>{doc.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
