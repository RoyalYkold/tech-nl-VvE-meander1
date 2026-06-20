import { useEffect, useState } from 'react'
import { api } from '../api'

export function ProfilePage() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    api('/private/profile').then(setProfile)
  }, [])

  if (!profile) {
    return <section className="container page">Laden...</section>
  }

  return (
    <section className="container page small">
      <h1>Mijn profiel</h1>
      <ul>
        <li><strong>Naam:</strong> {profile.name}</li>
        <li><strong>E-mail:</strong> {profile.email}</li>
        <li><strong>Rol:</strong> {profile.role}</li>
        <li><strong>Appartement:</strong> {profile.apartment_number || '-'}</li>
      </ul>
    </section>
  )
}
