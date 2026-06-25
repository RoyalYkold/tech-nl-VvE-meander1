import { Link } from 'react-router-dom'
import { quickLinksData } from '../data/quickLinksData'
import { sortedNewsData } from '../data/newsData'

const formatDate = (value) => new Date(value).toLocaleDateString('nl-NL', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

const latestNews = sortedNewsData.slice(0, 3)

const contributions = [
  'ALV documenten en besluiten overzichtelijk op één plek',
  'Snelle meldroutes voor onderhoud en praktische vragen',
  'Heldere informatie over garage, toegang en veiligheid',
]

export function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">VvE Meander1 · Van der Palmkade Amsterdam</p>
            <h1>VvE Meander 1</h1>
            <p className="hero-text">
              Moderne bewonerswebsite met praktische informatie, nieuws en duidelijke routes voor contact
              en beheer.
            </p>
            <div className="hero-actions">
              <Link to="/nieuws" className="btn btn-primary">
                Bekijk Meandernieuws
              </Link>
              <Link to="/algemene-informatie" className="btn btn-ghost">
                Algemene informatie
              </Link>
            </div>
            <div className="hero-meta">
              <div>
                <strong>Eigenaren</strong>
                <span>Als eigenaar bent u automatisch lid van de VvE.</span>
              </div>
              <div>
                <strong>ALV</strong>
                <span>Belangrijke besluiten worden genomen door de Algemene Ledenvergadering.</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-card hero-main-visual">
              <img
                src="https://images.unsplash.com/photo-1529421306624-54f4f4b5f8c4?auto=format&fit=crop&w=1200&q=80"
                alt="Wonen aan het water in Amsterdam"
              />
            </div>
            <div className="hero-visual-card hero-floating-card">
              <p>Bestuur en bewoners</p>
              <h2>Samen werken aan prettig wonen in Meander1.</h2>
            </div>
            <div className="hero-visual-card hero-stat-card">
              <span>Actueel</span>
              <strong>Nieuws · links · praktische pagina’s</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <p className="eyebrow">Korte intro over de VvE</p>
          <h2>De VvE beheert het complex, het bestuur coördineert en de ALV besluit.</h2>
        </div>
        <article className="premium-panel rich-copy">
          <p>
            VvE Meander1 vertegenwoordigt alle eigenaren in het complex. Het bestuur verzorgt de dagelijkse
            organisatie en afstemming met beheerpartners. In de ALV bepalen leden samen de koers voor
            onderhoud, begroting en gezamenlijke afspraken.
          </p>
        </article>
      </section>

      <section className="container section">
        <div className="section-heading">
          <p className="eyebrow">Laatste Meandernieuws</p>
          <h2>Recente berichten voor bewoners en eigenaren.</h2>
        </div>
        <div className="grid">
          {latestNews.map((item) => (
            <article key={item.id} className="premium-panel news-card">
              <span className="pill">{formatDate(item.date)}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <div className="card-actions">
                <Link to={`/nieuws/${item.id}`} className="btn btn-ghost">
                  Lees meer
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <p className="eyebrow">Meander kort en snel</p>
          <h2>Snelle links naar veelgebruikte onderwerpen.</h2>
        </div>
        <div className="grid">
          {quickLinksData.map((item) => (
            <article key={item.id} className="premium-panel feature-card quick-link-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="card-actions">
                {item.to ? (
                  <Link to={item.to} className="btn btn-ghost">
                    Open
                  </Link>
                ) : (
                  <a href={item.href} target="_blank" rel="noreferrer" className="btn btn-ghost">
                    Open
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-heading compact">
          <p className="eyebrow">Belangrijke bijdragen</p>
          <h2>Onderwerpen die veel impact hebben op dagelijks wonen.</h2>
        </div>
        <article className="premium-panel">
          <ul className="luxury-list">
            {contributions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="container section">
        <div className="section-heading compact">
          <p className="eyebrow">Over Meander1</p>
          <h2>Ontdek historie, buitenruimte en bewonersapp.</h2>
        </div>
        <div className="grid">
          <article className="premium-panel news-card">
            <h3>De historie van onze woonplek</h3>
            <p>Lees meer over de ontwikkeling van de woonomgeving en de plek van Meander1 in Amsterdam.</p>
            <div className="card-actions">
              <Link to="/historie" className="btn btn-ghost">Historie</Link>
            </div>
          </article>
          <article className="premium-panel news-card">
            <h3>De kade en het plein</h3>
            <p>Praktische informatie over gebruik van de gedeelde buitenruimte en het paaltje op het plein.</p>
            <div className="card-actions">
              <Link to="/de-kade-en-het-plein" className="btn btn-ghost">Bekijk pagina</Link>
            </div>
          </article>
          <article className="premium-panel news-card">
            <h3>Convect bewonersapp</h3>
            <p>Informatie over de VvE app voor meldingen, updates en praktische communicatie.</p>
            <div className="card-actions">
              <Link to="/convect" className="btn btn-ghost">Lees meer</Link>
            </div>
          </article>
        </div>
      </section>

      <section className="container section">
        <div className="contact-cta premium-panel">
          <div>
            <p className="eyebrow">Contactblok</p>
            <h2>Vragen over beheer, onderhoud of communicatie?</h2>
            <p>Neem contact op met de VvE via het formulier of stuur een e-mail naar webmaster@meander1.nl.</p>
          </div>
          <div className="contact-cta-actions">
            <Link to="/contact" className="btn btn-primary">
              Contact opnemen
            </Link>
            <Link to="/inloggen" className="btn btn-ghost">
              Inloggen
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
