import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './useAuth'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PageLayout } from './layouts/PageLayout'
import { AdminPage } from './pages/AdminPage'
import { ContactPage } from './pages/ContactPage'
import { DashboardPage } from './pages/DashboardPage'
import { DocumentsPage } from './pages/DocumentsPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { MaintenancePage } from './pages/MaintenancePage'
import { NewsPage } from './pages/NewsPage'
import { ProfilePage } from './pages/ProfilePage'
import { StaticPage } from './pages/StaticPage'
import { api } from './api'
import { defaultContent } from './utils/defaultContent'

function App() {
  const { user } = useAuth()
  const [content, setContent] = useState(defaultContent)

  useEffect(() => {
    api('/public/pages').then(setContent).catch(() => setContent(defaultContent))
  }, [])

  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/over" element={<StaticPage title="Over Meander1" content={content.about} />} />
        <Route path="/nieuws" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/parkeergarage" element={<StaticPage title="Parkeergarage" content={content.parking} />} />
        <Route path="/parqy" element={<StaticPage title="Parqy" content={content.parqy} />} />
        <Route path="/historie" element={<StaticPage title="Historie van het gebouw" content={content.history} />} />
        <Route path="/faq" element={<StaticPage title="Veelgestelde vragen" content={content.faq} />} />
        <Route path="/inloggen" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/nieuws"
          element={
            <ProtectedRoute>
              <NewsPage privateMode />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/documenten"
          element={
            <ProtectedRoute>
              <DocumentsPage privateMode />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/onderhoud"
          element={
            <ProtectedRoute>
              <MaintenancePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profiel"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/beheer"
          element={
            <ProtectedRoute roles={['admin', 'bestuur']}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageLayout>
  )
}

export default App
