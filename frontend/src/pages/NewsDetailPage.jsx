import { Link, Navigate, useParams } from 'react-router-dom'
import { getNewsById } from '../data/newsData'

const formatDate = (value) => new Date(value).toLocaleDateString('nl-NL', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

export function NewsDetailPage() {
  const { newsId } = useParams()
  const article = getNewsById(newsId)

  if (!article) {
    return <Navigate to="/nieuws" replace />
  }

  return (
    <section className="page-shell">
      <div className="container narrow-shell">
        <article className="premium-panel featured-story">
          <p className="eyebrow">Meandernieuws</p>
          <h1>{article.title}</h1>
          <span className="pill">{formatDate(article.date)}</span>
          <p>{article.summary}</p>
          <div className="rich-copy">
            {article.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="card-actions">
            <Link to="/nieuws" className="btn btn-ghost">
              Terug naar nieuws
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}
