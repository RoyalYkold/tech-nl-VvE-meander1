import { Link } from 'react-router-dom'
import { NavBar } from '../components/NavBar'

const footerLinks = [
  ['/', 'Home'],
  ['/nieuws', 'Nieuws & updates'],
  ['/parkeergarage', 'Parkeergarage'],
  ['/parqy', 'Parqy'],
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
            <h2>Een verzorgde digitale voordeur voor bewoners, eigenaren en bestuur.</h2>
            <p>
              Luxe uitstraling buiten, heldere dienstverlening binnen. De portal bundelt communicatie,
              documenten en bewonersservice in één rustige online omgeving.
            </p>
          </div>

          <div className="footer-links-block">
            <h3>Snel navigeren</h3>
            <div className="footer-links">
              {footerLinks.map(([to, label]) => (
                <Link key={to} to={to}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-contact">
            <h3>Contact</h3>
            <p>Van der Palmkade, Amsterdam</p>
            <p>Voor bewonersvragen en beheercommunicatie via het contactformulier of bewonersportaal.</p>
            <Link className="btn btn-primary" to="/contact">
              Contact opnemen
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} VvE Meander1 · Premium residentieel platform
        </div>
      </footer>
    </>
  )
}
