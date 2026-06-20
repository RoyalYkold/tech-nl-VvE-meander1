import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <section className="hero container">
      <div>
        <p className="badge">Van der Palmkade, Amsterdam</p>
        <h1>Welkom bij VvE Meander1</h1>
        <p>
          Een moderne portal voor bewoners en eigenaren: nieuws, documenten, ALV-informatie, onderhoudsmeldingen en belangrijke mededelingen op één plek.
        </p>
        <div className="row">
          <Link to="/nieuws" className="btn">
            Bekijk nieuws
          </Link>
          <Link to="/inloggen" className="btn btn-secondary">
            Naar bewonersomgeving
          </Link>
        </div>
      </div>
      <div className="hero-card">
        <h3>Snel naar</h3>
        <ul>
          <li>Openbare en besloten nieuwsberichten</li>
          <li>Documenten, notulen en reglement</li>
          <li>Parkeergarage en Parqy informatie</li>
        </ul>
      </div>
    </section>
  )
}
