import { Link } from 'react-router-dom'
import { NavBar } from '../components/NavBar'

const footerLinks = [
  ['/', 'Home'],
  ['/nieuws', 'Nieuws'],
  ['/algemene-informatie', 'Algemene informatie'],
  ['/contact', 'Contact'],
]

export function PageLayout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <footer className="site-footer">
        <div className="container footer-shell">
          <div className="footer-intro">
            <p className="eyebrow">VvE Meander1 Amsterdam</p>
            <h2>VvE communicatie voor bewoners van Meander1.</h2>
            <p>
              Deze website is voor communicatie vanuit de VvE Meander met de bewoners van het Meander1
              complex aan de Van der Palmkade in Amsterdam.
            </p>
          </div>

          <div className="footer-links-block">
            <h3>Snel naar</h3>
            <div className="footer-links">
              {footerLinks.map(([to, label]) => (
                <Link key={to} to={to}>
                  {label}
                </Link>
              ))}
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </div>
          </div>

          <div className="footer-contact">
            <h3>Contact</h3>
            <p>webmaster@meander1.nl</p>
            <p>Van der Palmkade, Amsterdam</p>
            <Link className="btn btn-primary" to="/contact">
              Contact opnemen
            </Link>
          </div>
        </div>
        <div className="footer-bottom">© 2026 VvE Meander 1</div>
      </footer>
    </>
  )
}
