import { Link } from 'react-router-dom'

const residentServices = [
  {
    title: 'Bewonersinformatie',
    text: 'Heldere updates over beheer, onderhoud, planning en praktische afspraken binnen het complex.',
  },
  {
    title: 'Documenten & ALV',
    text: 'Een rustige digitale omgeving voor notulen, reglementen, jaarstukken en bestuurlijke communicatie.',
  },
  {
    title: 'Service & meldingen',
    text: 'Directe routes voor onderhoudsvragen, verzoeken en afstemming met bestuur of beheerpartner.',
  },
]

const newsHighlights = [
  {
    title: 'Zomeronderhoud aan de kade en entrees',
    label: 'Planning',
    text: 'Overzicht van de geplande werkzaamheden rond de entreezones, groenvoorziening en gezamenlijke looproutes.',
  },
  {
    title: 'ALV-voorbereiding en nieuwe stukken beschikbaar',
    label: 'Bestuur',
    text: 'De belangrijkste documenten worden tijdig ontsloten voor bewoners, inclusief samenvattingen en besluiten.',
  },
  {
    title: 'Rustige communicatie, altijd op één plek',
    label: 'Portal',
    text: 'Belangrijke berichten zijn overzichtelijk terug te vinden zonder ruis van losse e-mails of appgroepen.',
  },
]

const portalFeatures = [
  'Persoonlijk dashboard voor nieuws, documenten en onderhoud',
  'Veilige toegang voor bewoners, bestuur en beheer',
  'Voorbereid op toekomstige uitbreidingen zonder backend lock-in',
]

const parkingFeatures = [
  'Parqy toegang en instructies overzichtelijk gebundeld',
  'Veiligheidsafspraken en meldroutes zonder zoekwerk',
  'Directe koppeling met bewonerscommunicatie voor storingen en updates',
]

export function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Luxe wonen aan het water · Amsterdam</p>
            <h1>Een premium digitale ervaring voor VvE Meander1.</h1>
            <p className="hero-text">
              Een rustige, verfijnde frontend voor bewoners, eigenaren en bestuur — ontworpen als
              residentieel platform met de uitstraling van hoogwaardig vastgoed.
            </p>
            <div className="hero-actions">
              <Link to="/inloggen" className="btn btn-primary">
                Bewonerslogin
              </Link>
              <Link to="/nieuws" className="btn btn-ghost">
                Bekijk updates
              </Link>
            </div>
            <div className="hero-meta">
              <div>
                <strong>Residentieel</strong>
                <span>Magazine-achtige indeling met premium hiërarchie</span>
              </div>
              <div>
                <strong>Toekomstvast</strong>
                <span>Voorbereid op bewonersportaal en dashboard-uitbreiding</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-card hero-main-visual">
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
                alt="Luxe appartementen aan het water"
              />
            </div>
            <div className="hero-visual-card hero-floating-card">
              <p>Curated resident experience</p>
              <h2>Wonen, beheer en communicatie in één elegante flow.</h2>
            </div>
            <div className="hero-visual-card hero-stat-card">
              <span>Premium portal preview</span>
              <strong>Nieuws · documenten · service</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="container section editorial-section">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Visuele introductie</p>
            <h2>Meander1 voelt als een residentiële bestemming, niet als een standaard informatiepagina.</h2>
          </div>
          <p>
            De nieuwe homepage combineert verfijnde typografie, royale witruimte en een editorial
            compositie die past bij een luxe appartementencomplex aan het Amsterdamse water.
          </p>
        </div>

        <div className="editorial-grid">
          <article className="editorial-copy premium-panel">
            <span className="pill">VvE Meander1</span>
            <h3>Verzorgd beheer begint bij een helder digitaal ontvangst.</h3>
            <p>
              Van nieuws en ALV-documenten tot bewonersservice en garage-informatie: alles krijgt
              een premium plek met rust, orde en vertrouwen als uitgangspunt.
            </p>
            <Link to="/over" className="text-link">
              Ontdek meer over Meander1
            </Link>
          </article>

          <article className="image-panel">
            <img
              src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80"
              alt="Architectuur en waterfront in Amsterdam"
            />
          </article>
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <p className="eyebrow">Bewonersinformatie</p>
          <h2>Belangrijke informatie krijgt een premium, overzichtelijke presentatie.</h2>
        </div>
        <div className="feature-grid">
          {residentServices.map((item) => (
            <article key={item.title} className="feature-card premium-panel">
              <span className="feature-index">0{residentServices.indexOf(item) + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="news-showcase">
          <div className="news-feature premium-panel">
            <p className="eyebrow">Nieuws & updates</p>
            <h2>Communicatie met allure: actueel, rustig en herkenbaar.</h2>
            <p>
              Geen drukke feed, maar een luxe presentatie van updates die past bij de kwaliteit van
              het gebouw en de verwachtingen van bewoners en eigenaren.
            </p>
            <Link to="/nieuws" className="btn btn-primary">
              Naar alle updates
            </Link>
          </div>

          <div className="news-grid">
            {newsHighlights.map((item) => (
              <article key={item.title} className="news-card premium-panel">
                <span className="pill">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="portal-teaser premium-panel">
          <div className="portal-copy">
            <p className="eyebrow">Bewonersportaal teaser</p>
            <h2>Een dashboard-preview die klaarstaat voor de volgende fase.</h2>
            <p>
              Deze frontend geeft alvast de beleving van een toekomstig portaal: verfijnde kaarten,
              rustige statusblokken en ruimte voor documenten, nieuws en onderhoud.
            </p>
            <ul className="luxury-list">
              {portalFeatures.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="dashboard-preview">
            <div className="dashboard-preview-top">
              <div>
                <span>Resident dashboard</span>
                <strong>Goedemiddag, bewoner</strong>
              </div>
              <div className="dashboard-preview-status">Live preview</div>
            </div>
            <div className="dashboard-preview-grid">
              <article className="dashboard-widget large">
                <span>Laatste update</span>
                <strong>Nieuwe ALV-stukken beschikbaar</strong>
                <p>Met ruimte voor samenvattingen, deadlines en vervolgstappen.</p>
              </article>
              <article className="dashboard-widget">
                <span>Documenten</span>
                <strong>12 items</strong>
                <p>Reglementen, notulen en jaarstukken.</p>
              </article>
              <article className="dashboard-widget">
                <span>Onderhoud</span>
                <strong>2 open verzoeken</strong>
                <p>Snelle statusweergave voor bewoners.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="container section parking-section">
        <div className="parking-copy">
          <p className="eyebrow">Parkeergarage & Parqy</p>
          <h2>Mobiliteit en toegang in dezelfde verfijnde stijl.</h2>
          <p>
            Ook praktische onderdelen verdienen een hoogwaardige presentatie: helder, veilig en
            direct te begrijpen voor bewoners en gasten.
          </p>
          <ul className="luxury-list">
            {parkingFeatures.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="hero-actions">
            <Link to="/parkeergarage" className="btn btn-primary">
              Parkeergarage
            </Link>
            <Link to="/parqy" className="btn btn-ghost">
              Over Parqy
            </Link>
          </div>
        </div>

        <div className="parking-visual premium-panel">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
            alt="Moderne architectuur en parkeervoorziening"
          />
        </div>
      </section>

      <section className="container section">
        <div className="contact-cta premium-panel">
          <div>
            <p className="eyebrow">Contact & footer</p>
            <h2>Een stijlvolle afsluiting met directe routes naar bestuur en bewonersservice.</h2>
            <p>
              Voor algemene vragen, beheercommunicatie of portaalondersteuning is de route kort,
              professioneel en helder ingericht.
            </p>
          </div>
          <div className="contact-cta-actions">
            <Link to="/contact" className="btn btn-primary">
              Neem contact op
            </Link>
            <Link to="/inloggen" className="btn btn-ghost">
              Open bewonersomgeving
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
