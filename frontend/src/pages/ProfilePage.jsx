import { useEffect, useState } from 'react'
import { api } from '../api'

export function ProfilePage() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    api('/private/profile').then(setProfile)
  }, [])

  if (!profile) {
    return (
      <section className="page-shell">
        <div className="container">
          <article className="premium-panel empty-state">
            <h2>Profiel wordt geladen</h2>
            <p>Even geduld terwijl uw bewonersgegevens worden opgehaald.</p>
          </article>
        </div>
      </section>
    )
  }

  return (
    <section className="page-shell">
      <div className="container">
        <div className="page-hero premium-panel">
          <p className="eyebrow">Mijn profiel</p>
          <h1>Persoonlijke bewonersgegevens</h1>
          <p>Een helder overzicht van uw accountinformatie binnen de Meander1 omgeving.</p>
        </div>

        <div className="profile-grid">
          <article className="premium-panel">
            <h3>Account</h3>
            <ul className="detail-list">
              <li><strong>Naam</strong><span>{profile.name}</span></li>
              <li><strong>E-mail</strong><span>{profile.email}</span></li>
              <li><strong>Rol</strong><span>{profile.role}</span></li>
              <li><strong>Appartement</strong><span>{profile.apartment_number || '-'}</span></li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
