import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { Card } from '../components/Card'
import { useAuth } from '../useAuth'

export function DashboardPage() {
  const [data, setData] = useState({ latestNews: [], latestDocs: [] })
  const [error, setError] = useState('')
  const { user, isAdminOrBoard } = useAuth()

  useEffect(() => {
    api('/private/dashboard').then(setData).catch((e) => setError(e.message))
  }, [])

  return (
    <section className="container page">
      <h1>Dashboard</h1>
      <p>Welkom {user?.name}. Hier vindt u de laatste updates.</p>
      {error ? <p className="error">{error}</p> : null}
      <div className="dashboard-links">
        <Link className="btn" to="/dashboard/nieuws">Besloten nieuws</Link>
        <Link className="btn" to="/dashboard/documenten">Documenten</Link>
        <Link className="btn" to="/dashboard/onderhoud">Onderhoud / vraag indienen</Link>
        <Link className="btn btn-secondary" to="/dashboard/profiel">Mijn profiel</Link>
        {isAdminOrBoard ? <Link className="btn" to="/dashboard/beheer">Beheer</Link> : null}
      </div>
      <h2>Laatste nieuws</h2>
      <div className="grid">
        {data.latestNews.map((item) => (
          <Card key={item.id} title={item.title} subtitle={new Date(item.published_at).toLocaleDateString('nl-NL')}>
            <p>{item.summary}</p>
          </Card>
        ))}
      </div>
      <h2>Laatste documenten</h2>
      <div className="grid">
        {data.latestDocs.map((doc) => (
          <Card key={doc.id} title={doc.title} subtitle={doc.category}>
            <p>{new Date(doc.created_at).toLocaleDateString('nl-NL')}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
