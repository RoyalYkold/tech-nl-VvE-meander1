import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../useAuth'

const publicLinks = [
  ['/', 'Home'],
  ['/nieuws', 'Nieuws'],
  ['/algemene-informatie', 'Algemene informatie'],
  ['/parkeergarage', 'Parkeergarage'],
  ['/parqy', 'Parqy'],
  ['/duurzaamheid', 'Duurzaamheid'],
  ['/historie', 'Historie'],
  ['/contact', 'Contact'],
  ['/inloggen', 'Inloggen'],
]

export function NavBar() {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(pathname !== '/')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(pathname !== '/' || window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return (
    <header className={`topbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'open' : ''}`}>
      <div className="container nav-shell">
        <Link className="brand" to="/">
          <span className="brand-mark">M1</span>
          <span className="brand-copy">
            <strong>VvE Meander1</strong>
            <span>Van der Palmkade · Amsterdam</span>
          </span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label="Open navigatie"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <div className="nav-panel">
          <nav className="nav-links">
            {publicLinks.map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMenuOpen(false)}>
                {label}
              </NavLink>
            ))}
            {user ? <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink> : null}
          </nav>

          <div className="nav-actions">
            {user ? (
              <button onClick={() => { setMenuOpen(false); logout() }} className="btn btn-ghost" type="button">
                Uitloggen
              </button>
            ) : null}
            <Link to={user ? '/dashboard' : '/contact'} className="btn btn-primary" onClick={() => setMenuOpen(false)}>
              {user ? 'Open portaal' : 'Stel een vraag'}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
