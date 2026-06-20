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

  return (
    <section className="container page">
      <h1>{privateMode ? 'Nieuws voor bewoners' : 'Nieuws'}</h1>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Zoek in nieuws" />
      {error ? <p className="error">{error}</p> : null}
      <div className="grid">
        {news.map((item) => (
          <Card key={item.id} title={item.title} subtitle={new Date(item.published_at).toLocaleDateString('nl-NL')}>
            <p>{item.summary}</p>
            <p>{item.content}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
