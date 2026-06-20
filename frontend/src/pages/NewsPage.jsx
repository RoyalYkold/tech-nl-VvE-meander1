import { useEffect, useState } from 'react'
import { api } from '../api'
import { Card } from '../components/Card'

export function NewsPage({ privateMode = false }) {
  const [query, setQuery] = useState('')
  const [news, setNews] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api(`${privateMode ? '/private' : '/public'}/news?search=${encodeURIComponent(query)}`)
      .then(setNews)
      .catch((e) => setError(e.message))
  }, [query, privateMode])

  const [featured, ...rest] = news

  return (
    <section className="page-shell">
      <div className="container">
        <div className="page-hero premium-panel">
          <p className="eyebrow">{privateMode ? 'Bewonersnieuws' : 'Nieuws & updates'}</p>
          <h1>{privateMode ? 'Nieuws voor bewoners' : 'Actuele berichten rond Meander1'}</h1>
          <p>Alle belangrijke updates gepresenteerd in een rustige, hoogwaardige nieuwsindeling.</p>
        </div>

        <div className="filter-bar premium-panel">
          <label className="input-group">
            <span>Zoek in nieuws</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Bijvoorbeeld ALV, onderhoud of bestuur" />
          </label>
        </div>

        {error ? <p className="error page-feedback">{error}</p> : null}

        {featured ? (
          <article className="premium-panel featured-story">
            <span className="pill">{new Date(featured.published_at).toLocaleDateString('nl-NL')}</span>
            <h2>{featured.title}</h2>
            <p>{featured.summary}</p>
            <div className="rich-copy">
              <p>{featured.content}</p>
            </div>
          </article>
        ) : (
          <article className="premium-panel empty-state">
            <h3>Geen nieuws gevonden</h3>
            <p>Er zijn momenteel nog geen berichten beschikbaar voor deze zoekopdracht.</p>
          </article>
        )}

        <div className="grid">
          {rest.map((item) => (
            <Card key={item.id} title={item.title} subtitle={new Date(item.published_at).toLocaleDateString('nl-NL')}>
              <p>{item.summary}</p>
              <p>{item.content}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
