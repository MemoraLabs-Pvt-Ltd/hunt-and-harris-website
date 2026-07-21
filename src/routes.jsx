import App from './App.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import PayOnlinePage from './pages/PayOnlinePage.jsx'
import ConveyancingPage from './pages/ConveyancingPage.jsx'
import OffPlanPage from './pages/OffPlanPage.jsx'
import OffPlanDetailPage from './pages/OffPlanDetailPage.jsx'
import PortalLogin from './components/portal/PortalLogin.jsx'
import TenantPortal from './components/portal/TenantPortal.jsx'
import LandlordPortal from './components/portal/LandlordPortal.jsx'
import AdminPortal from './components/portal/AdminPortal.jsx'
import { properties } from './data/offPlan'

const offPlanDetailRoutes = properties.map((p) => ({
  path: `/off-plan/${p.slug}`,
  element: <OffPlanDetailPage slug={p.slug} />,
}))

export const routes = [
  { path: '/', element: <App /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/services', element: <ServicesPage /> },
  { path: '/blog', element: <BlogPage /> },
  { path: '/pay-online', element: <PayOnlinePage /> },
  { path: '/conveyancing', element: <ConveyancingPage /> },
  { path: '/off-plan', element: <OffPlanPage /> },
  ...offPlanDetailRoutes,
  { path: '/portal/login', element: <PortalLogin /> },
  { path: '/portal/tenant', element: <TenantPortal /> },
  { path: '/portal/landlord', element: <LandlordPortal /> },
  { path: '/portal/admin', element: <AdminPortal /> },
]
