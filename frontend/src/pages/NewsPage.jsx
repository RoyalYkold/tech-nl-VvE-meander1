import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { Card } from '../components/Card'
import { sortedNewsData } from '../data/newsData'

const formatDate = (value) => new Date(value).toLocaleDateString('nl-NL', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

export function NewsPage({ privateMode = false }) {
  const [query, setQuery] = useState('')
  const [news, setNews] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!privateMode) {
      return
    }

    api(`/private/news?search=${encodeURIComponent(query)}`)
      .then(setNews)
      .catch((e) => setError(e.message))
  }, [query, privateMode])

  const publicNews = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) {
      return sortedNewsData
    }
    return sortedNewsData.filter((item) => {
      const haystack = `${item.title} ${item.summary} ${item.content.join(' ')}`.toLowerCase()
      return haystack.includes(search)
    })
  }, [query])

  const items = privateMode ? news : publicNews
  const [featured, ...rest] = items

  return (
    <section className="page-shell">
      <div className="container">
        <div className="page-hero premium-panel">
          <p className="eyebrow">{privateMode ? 'Bewonersnieuws' : 'Meandernieuws'}</p>
          <h1>{privateMode ? 'Nieuws voor bewoners' : 'Nieuws en updates van VvE Meander1'}</h1>
          <p>Overzicht met actuele berichten, samenvattingen en een directe route naar volledige artikelen.</p>
        </div>

        <div className="filter-bar premium-panel">
          <label className="input-group">
            <span>Zoek in nieuws</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Bijvoorbeeld ALV, onderhoud of brandveiligheid" />
          </label>
        </div>

        {error ? <p className="error page-feedback">{error}</p> : null}

        {featured ? (
          <article className="premium-panel featured-story">
            <span className="pill">{privateMode ? formatDate(featured.published_at) : formatDate(featured.date)}</span>
            <h2>{featured.title}</h2>
            <p>{featured.summary}</p>
            {!privateMode ? (
              <div className="card-actions">
                <Link to={`/nieuws/${featured.id}`} className="btn btn-primary">
                  Lees meer
                </Link>
              </div>
            ) : (
              <div className="rich-copy">
                <p>{featured.content}</p>
              </div>
            )}
          </article>
        ) : (
          <article className="premium-panel empty-state">
            <h3>Geen nieuws gevonden</h3>
            <p>Er zijn momenteel geen berichten beschikbaar voor deze zoekopdracht.</p>
          </article>
        )}

        <div className="grid">
          {rest.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              subtitle={privateMode ? formatDate(item.published_at) : formatDate(item.date)}
              actions={
                privateMode ? null : (
                  <Link to={`/nieuws/${item.id}`} className="btn btn-ghost">
                    Lees meer
                  </Link>
                )
              }
            >
              <p>{item.summary}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
