import App from './App.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import PayOnlinePage from './pages/PayOnlinePage.jsx'
import ConveyancingPage from './pages/ConveyancingPage.jsx'
import OffPlanPage from './pages/OffPlanPage.jsx'
import PortalLogin from './components/portal/PortalLogin.jsx'
import TenantPortal from './components/portal/TenantPortal.jsx'
import LandlordPortal from './components/portal/LandlordPortal.jsx'
import AdminPortal from './components/portal/AdminPortal.jsx'
import FeedPage from './pages/FeedPage.jsx'
import ListingsPage from './pages/ListingsPage.jsx'
import PropertyPage from './pages/PropertyPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import BlogPostPage from './pages/BlogPostPage.jsx'
import GuidesPage from './pages/GuidesPage.jsx'
import { feedLoader, propertyLoader, propertyPaths } from './data/feedLoader'
import { blogPostLoader, blogPostPaths } from './data/blogPosts'

export const routes = [
  // No loader — the home page renders its top content immediately and the
  // Properties section fetches /data/home.json client-side (with a skeleton),
  // so a slow feed never delays the hero.
  { path: '/', element: <App /> },
  { path: '/about', element: <AboutPage /> },
  // No loader — the page shell + filter bar render immediately and the grid
  // fetches /data/listings-all.json client-side (with a skeleton), so soft
  // navigation to Listings is instant instead of blocking on the feed.
  { path: '/listings', element: <ListingsPage /> },
  { path: '/property/:ref', element: <PropertyPage />, loader: propertyLoader, getStaticPaths: propertyPaths },
  { path: '/services', element: <ServicesPage /> },
  { path: '/blog', element: <BlogPage /> },
  { path: '/guides', element: <GuidesPage /> },
  { path: '/blog/:slug', element: <BlogPostPage />, loader: blogPostLoader, getStaticPaths: blogPostPaths },
  { path: '/pay-online', element: <PayOnlinePage /> },
  { path: '/conveyancing', element: <ConveyancingPage /> },
  { path: '/contact', element: <ContactPage /> },
  // No loader — instant shell; the grid fetches /data/off-plan.json client-side.
  { path: '/off-plan', element: <OffPlanPage /> },
  { path: '/portal/login', element: <PortalLogin /> },
  { path: '/portal/tenant', element: <TenantPortal /> },
  { path: '/portal/landlord', element: <LandlordPortal /> },
  { path: '/portal/admin', element: <AdminPortal /> },
  { path: '/feed', element: <FeedPage />, loader: feedLoader },
]
