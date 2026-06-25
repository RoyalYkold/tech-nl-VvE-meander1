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
import { NewsDetailPage } from './pages/NewsDetailPage'
import { NewsPage } from './pages/NewsPage'
import { ProfilePage } from './pages/ProfilePage'
import { StaticPage } from './pages/StaticPage'
import { pageContentData } from './data/pageContentData'

function App() {
  const { user } = useAuth()

  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nieuws" element={<NewsPage />} />
        <Route path="/nieuws/:newsId" element={<NewsDetailPage />} />
        <Route path="/algemene-informatie" element={<StaticPage page={pageContentData.algemeneInformatie} />} />
        <Route path="/parkeergarage" element={<StaticPage page={pageContentData.parkeergarage} />} />
        <Route path="/parqy" element={<StaticPage page={pageContentData.parqy} />} />
        <Route path="/duurzaamheid" element={<StaticPage page={pageContentData.duurzaamheid} />} />
        <Route path="/historie" element={<StaticPage page={pageContentData.historie} />} />
        <Route path="/de-kade-en-het-plein" element={<StaticPage page={pageContentData.kadeEnPlein} />} />
        <Route path="/convect" element={<StaticPage page={pageContentData.convect} />} />
        <Route path="/fotos" element={<StaticPage page={pageContentData.fotos} />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/inloggen" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/over" element={<Navigate to="/algemene-informatie" replace />} />
        <Route path="/faq" element={<Navigate to="/algemene-informatie" replace />} />

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
