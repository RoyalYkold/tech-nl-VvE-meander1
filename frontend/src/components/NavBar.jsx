import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../useAuth'

const publicLinks = [
  ['/', 'Home'],
  ['/over', 'Over Meander1'],
  ['/nieuws', 'Nieuws'],
  ['/parkeergarage', 'Parkeergarage'],
  ['/parqy', 'Parqy'],
  ['/historie', 'Historie'],
  ['/faq', 'Veelgestelde vragen'],
  ['/contact', 'Contact'],
]

export function NavBar({ darkMode, toggleDarkMode }) {
  const { user, logout } = useAuth()

  return (
    <header className="topbar">
      <div className="container nav-row">
        <Link className="brand" to="/">
          VvE Meander1
        </Link>
        <nav className="nav-links">
          {publicLinks.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {label}
            </NavLink>
          ))}
          {user ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <button onClick={logout} className="btn btn-secondary" type="button">
                Uitloggen
              </button>
            </>
          ) : (
            <NavLink to="/inloggen">Inloggen</NavLink>
          )}
          <button onClick={toggleDarkMode} className="btn btn-secondary" type="button">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  )
}
