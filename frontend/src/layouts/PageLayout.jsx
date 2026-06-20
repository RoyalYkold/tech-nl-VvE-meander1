import { NavBar } from '../components/NavBar'

export function PageLayout({ children, darkMode, toggleDarkMode }) {
  return (
    <>
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>{children}</main>
      <footer className="footer">© {new Date().getFullYear()} VvE Meander1</footer>
    </>
  )
}
