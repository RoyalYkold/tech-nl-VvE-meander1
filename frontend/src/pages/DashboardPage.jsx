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
    <section className="page-shell">
      <div className="container">
        <div className="dashboard-hero premium-panel">
          <div>
            <p className="eyebrow">Bewonersdashboard</p>
            <h1>Welkom {user?.name}</h1>
            <p>
              Een rustig overzicht van nieuws, documenten en serviceverzoeken voor bewoners en
              bestuur van VvE Meander1.
            </p>
          </div>
          <div className="dashboard-summary">
            <article>
              <span>Nieuws</span>
              <strong>{data.latestNews.length}</strong>
            </article>
            <article>
              <span>Documenten</span>
              <strong>{data.latestDocs.length}</strong>
            </article>
            <article>
              <span>Status</span>
              <strong>Actief</strong>
            </article>
          </div>
        </div>

        {error ? <p className="error page-feedback">{error}</p> : null}

        <div className="dashboard-links">
          <Link className="btn btn-primary" to="/dashboard/nieuws">Besloten nieuws</Link>
          <Link className="btn btn-primary" to="/dashboard/documenten">Documenten</Link>
          <Link className="btn btn-ghost" to="/dashboard/onderhoud">Onderhoud / vraag</Link>
          <Link className="btn btn-ghost" to="/dashboard/profiel">Mijn profiel</Link>
          {isAdminOrBoard ? <Link className="btn btn-ghost" to="/dashboard/beheer">Beheer</Link> : null}
        </div>

        <div className="content-columns">
          <div>
            <div className="section-heading compact">
              <p className="eyebrow">Laatste nieuws</p>
              <h2>Direct inzicht in bewonersupdates</h2>
            </div>
            <div className="grid">
              {data.latestNews.map((item) => (
                <Card key={item.id} title={item.title} subtitle={new Date(item.published_at).toLocaleDateString('nl-NL')}>
                  <p>{item.summary}</p>
                </Card>
              ))}
              {!data.latestNews.length ? (
                <article className="premium-panel empty-state">
                  <h3>Nog geen nieuwsitems</h3>
                  <p>Zodra er berichten zijn, verschijnen ze hier in een rustige overzichtskaart.</p>
                </article>
              ) : null}
            </div>
          </div>

          <div>
            <div className="section-heading compact">
              <p className="eyebrow">Documenten</p>
              <h2>Recent toegevoegde stukken</h2>
            </div>
            <div className="grid">
              {data.latestDocs.map((doc) => (
                <Card key={doc.id} title={doc.title} subtitle={doc.category}>
                  <p>{new Date(doc.created_at).toLocaleDateString('nl-NL')}</p>
                </Card>
              ))}
              {!data.latestDocs.length ? (
                <article className="premium-panel empty-state">
                  <h3>Nog geen documenten</h3>
                  <p>Nieuwe documenten worden hier gepresenteerd zodra ze beschikbaar zijn.</p>
                </article>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
